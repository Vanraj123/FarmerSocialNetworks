package com.farmer.main.controllers;

import com.farmer.main.entities.Comment;
import com.farmer.main.entities.CommentRequest;
import com.farmer.main.entities.CommentResponse;
import com.farmer.main.entities.Post;
import com.farmer.main.entities.User;
import com.farmer.main.services.CommentService;
import com.farmer.main.services.PostService;
import com.farmer.main.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private static final Logger logger = LoggerFactory.getLogger(CommentController.class);

    @Autowired
    private CommentService commentService;

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    // Get all comments
    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    // Save a comment for a specific post
    @PostMapping("/{postId}")
    public ResponseEntity<CommentResponse> saveComment(@PathVariable Long postId, @RequestBody CommentRequest commentRequest) throws Exception {
        Post post = postService.getPostById(postId);
        if (post == null) {
            throw new Exception("Post not found with ID: " + postId);
        }

        User user = userService.getUserById(commentRequest.getUserId());
        if (user == null) {
            throw new Exception("User not found with ID: " + commentRequest.getUserId());
        }

        if (commentRequest.getContent() == null || commentRequest.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("Comment content cannot be empty.");
        }

        Comment comment = new Comment();
        comment.setContent(commentRequest.getContent());
        comment.setPost(post);
        comment.setUsers(List.of(user));
        comment.setTimestamp(java.time.LocalDateTime.now().toString());

        Comment savedComment = commentService.saveComment(comment);

        CommentResponse commentResponse = new CommentResponse(
            savedComment.getId(),
            savedComment.getPost().getId(),
            savedComment.getContent(),
            savedComment.getTimestamp(),
            user.getName(),        // Include the username
            user.getId(),           // Include the userId
            user.getRole()          // Include the role
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(commentResponse);
    }

    // Get a comment by ID
    @GetMapping("/{postId}")
    public ResponseEntity<List<CommentResponse>> getCommentsByPostId(@PathVariable Long postId) {
        try {
            // Fetch comments for the given postId
            List<Comment> comments = commentService.getCommentsByPostId(postId);

            // Handle case when no comments are found
            if (comments == null || comments.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // 204 No Content
            }

            // Map comments to CommentResponse DTOs
            List<CommentResponse> commentResponses = comments.stream()
                    .map(comment -> new CommentResponse(
                            comment.getId(),
                            comment.getPost().getId(),
                            comment.getContent(),
                            comment.getTimestamp(),
                            comment.getUsers().get(0).getName(), // Include the username
                            comment.getUsers().get(0).getId(),   // Include the userId
                            comment.getUsers().get(0).getRole()  // Include the role
                    ))
                    .collect(Collectors.toList());

            // Return the list of comment responses
            return ResponseEntity.ok(commentResponses); // 200 OK
        } catch (Exception e) {
            // Handle unexpected errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    // Delete a comment by ID
    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id) throws Exception {
        logger.info("Attempting to delete comment with id: {}", id);

        Comment comment = commentService.getCommentById(id);
        if (comment == null) {
            throw new Exception("Comment not found with ID: " + id);
        }

        commentService.deleteComment(id);
    }
}
