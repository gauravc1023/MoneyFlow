package com.project.moneyflow.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.moneyflow.dto.request.CategoryRequestDTO;
import com.project.moneyflow.dto.response.CategoryResponseDTO;
import com.project.moneyflow.service.CategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	private final CategoryService service;
	
	public CategoryController(CategoryService service) {
		this.service=service;
	}
	
//	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping
	public ResponseEntity<CategoryResponseDTO> save(@Valid @RequestBody CategoryRequestDTO requestDTo){
		
		return ResponseEntity.ok(service.save(requestDTo));
	}
	
	@GetMapping
	public ResponseEntity<List<CategoryResponseDTO>> getAll(){
		
		return ResponseEntity.ok(service.getAllCategories());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CategoryResponseDTO> getById(@PathVariable Long id){
		return ResponseEntity.ok(service.getCategory(id));
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<CategoryResponseDTO> update(@PathVariable Long id,@Valid @RequestBody CategoryRequestDTO requestDTo){
		return ResponseEntity.ok(service.update(id, requestDTo));
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(@PathVariable Long id){
		service.deleteCategory(id);
		return ResponseEntity.ok("Category Deleted Successfully");
	}
}
