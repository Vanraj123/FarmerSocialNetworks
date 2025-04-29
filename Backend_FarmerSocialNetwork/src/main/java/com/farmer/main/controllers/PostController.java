package com.farmer.main.controllers;

import com.farmer.main.entities.Post;
import com.farmer.main.entities.PostDTO;
import com.farmer.main.entities.User;
import com.farmer.main.services.PostService;
import com.farmer.main.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@RestController
@RequestMapping("api/posts")
public class PostController {
	
	@Autowired
    private final PostService postService;
	
	@Autowired
    private UserService userService;
	
	private final String UPLOAD_DIR = "C:/xampp/htdocs/img/"; // Updated to use img folder

    public PostController(PostService postService) {
        this.postService = postService;
    }

    // Get all posts
    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        List<PostDTO> postDTOs = posts.stream()
                .map(post -> {
                    User user = post.getUser();
                    return new PostDTO(
                            post.getId(),
                            post.getTitle(),
                            post.getContent(),
                            post.getImagePath(),
                            post.getTimestamp(),
                            user.getId(),
                            user.getName(),
                            user.getRole(), // Fetch user role
                            post.getLikes()
                    );
                })
                .toList();

        return ResponseEntity.ok(postDTOs);
    }
    
    
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadPost(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("file") MultipartFile file,
            @RequestParam("user_id") Long userId) {
        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is missing.");
            }

            // Fetch user
            User user = userService.getUserById(userId);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }

            // Save the image to the img directory
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String filePath = UPLOAD_DIR + fileName;
            java.io.File directory = new java.io.File(UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs(); // Create directory if it doesn't exist
            }
            file.transferTo(new java.io.File(filePath));

            // Create and save post
            Post post = new Post();
            post.setTitle(title);
            post.setContent(content);
            post.setImagePath("http://localhost/img/" + fileName); // URL for the image
            post.setTimestamp(String.valueOf(System.currentTimeMillis()));
            post.setUser(user);

            Post savedPost = postService.savePost(post);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPost);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
    // Get post by ID
    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        if (post == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        User user = post.getUser();
        PostDTO postDTO = new PostDTO(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getImagePath(),
                post.getTimestamp(),
                user.getId(),
                user.getName(),
                user.getRole(), // Include user role
                post.getLikes()
        );

        return ResponseEntity.ok(postDTO);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        boolean isDeleted = postService.deletePost(id);
        if (!isDeleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.noContent().build();
    }
 // Like or unlike a post
    @PostMapping("/{postId}/like")
    public ResponseEntity<?> likePost(@PathVariable Long postId, @RequestParam Long userId) {
        try {
            boolean isLiked = postService.toggleLike(postId, userId);

            // Fetch the updated post to include the updated likes count
            Post updatedPost = postService.getPostById(postId);
            if (updatedPost == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            // Fetch user details
            User user = updatedPost.getUser();
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }

            // Map the updated post to PostDTO to include likes in the response
            PostDTO postDTO = new PostDTO(
                    updatedPost.getId(),
                    updatedPost.getTitle(),
                    updatedPost.getContent(),
                    updatedPost.getImagePath(),
                    updatedPost.getTimestamp(),
                    user.getId(),
                    user.getName(),
                    user.getRole(), // Include user role
                    updatedPost.getLikes() // Include updated likes count
            );

            return ResponseEntity.ok(postDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

 // Check if a user liked a specific post
    @GetMapping("/{postId}/isLiked")
    public ResponseEntity<Boolean> isPostLikedByUser(@PathVariable Long postId, @RequestParam Long userId) {
        try {
            boolean isLiked = postService.isPostLikedByUser(postId, userId);
            return ResponseEntity.ok(isLiked);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
