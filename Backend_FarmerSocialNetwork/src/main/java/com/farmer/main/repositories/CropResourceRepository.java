package com.farmer.main.repositories;

import com.farmer.main.entities.CropResource;
import com.farmer.main.entities.User;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CropResourceRepository extends JpaRepository<CropResource, Long> {
    List<CropResource> findByCategory(CropResource.Season category);
    
    List<CropResource> findByUploadedBy(User user);

    @Query("SELECT DISTINCT c.category FROM CropResource c")
    List<String> findDistinctCategories();
    
    @Query("SELECT c FROM CropResource c JOIN FETCH c.uploadedBy")
    List<CropResource> findAllWithUploadedBy();
    
    @EntityGraph(attributePaths = {"uploadedBy", "uploadedBy.specializations"})
    List<CropResource> findAll();


}