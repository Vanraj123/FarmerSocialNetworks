package com.farmer.main.services;

import com.farmer.main.entities.Post;
import com.farmer.main.entities.User;
import com.farmer.main.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private UserService userService;
    
    public boolean toggleLike(Long postId, Long userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));

        // Fetch the User object from the userService
        User user = userService.getUserById(userId);

        if (post.getLikedUsers().contains(user)) {
            post.getLikedUsers().remove(user);  // Remove the user from the liked users list
            post.setLikes(post.getLikes() - 1); // Decrement the like count
        } else {
            post.getLikedUsers().add(user);  // Add the user to the liked users list
            post.setLikes(post.getLikes() + 1); // Increment the like count
        }

        postRepository.save(post);  // Save the updated post

        // Log to verify the changes
        System.out.println("Updated Likes Count: " + post.getLikes());
        return post.getLikedUsers().contains(user); // Return true if the user is now in the liked list
    }




    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }

    public boolean deletePost(Long id) {
        Post post = getPostById(id);
        if (post == null) return false;

        // Delete the image from the XAMPP directory
        String filePath = post.getImagePath().replace("http://localhost/uploads/", "C:/xampp/htdocs/uploads/");
        java.io.File file = new java.io.File(filePath);
        if (file.exists()) {
            file.delete();
        }

        postRepository.deleteById(id);
        return true;
    }
    public boolean isPostLikedByUser(Long postId, Long userId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            throw new RuntimeException("Post not found");
        }
        return post.getLikedUsers().stream().anyMatch(user -> user.getId().equals(userId));
    }

}
