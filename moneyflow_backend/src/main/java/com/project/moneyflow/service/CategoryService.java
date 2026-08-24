package com.project.moneyflow.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.moneyflow.dto.request.CategoryRequestDTO;
import com.project.moneyflow.dto.response.CategoryResponseDTO;
import com.project.moneyflow.entity.Category;
import com.project.moneyflow.exception.ResourceNotFoundException;
import com.project.moneyflow.mapper.CategoryMapper;
import com.project.moneyflow.repository.CategoryRepository;
import com.project.moneyflow.repository.TransactionRepository;

@Service
public class CategoryService {

	private final CategoryRepository repository;
	private final TransactionRepository transactionRepository;
	
	//Contructor
	public CategoryService(CategoryRepository repository, TransactionRepository transactionRepository) {
		this.repository = repository;
		this.transactionRepository = transactionRepository;
	}

	//Save
	public CategoryResponseDTO save(CategoryRequestDTO requestDTO) {
		 
		if(repository.existsByName(requestDTO.getName())) {
			throw new IllegalStateException("Category already exists");
		}
		
		Category category = new Category();
		
		category.setName(requestDTO.getName());
		
		Category savedCategory = repository.save(category);
		
		return CategoryMapper.toResponseDTO(savedCategory);
	}
	
	//Get All
	public List<CategoryResponseDTO> getAllCategories(){
		
		List<Category> categories = repository.findAll();
		
		List<CategoryResponseDTO> responseList = new ArrayList<>();
		
		for(Category category: categories) {
			
			responseList.add(CategoryMapper.toResponseDTO(category));
			
		}
		
		return responseList;
	}
	
	//Get Category
	public CategoryResponseDTO getCategory(Long id) {
		
		Category category =  repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Category not Found")); 
		
		return CategoryMapper.toResponseDTO(category);
	}
	
	//Update
	public CategoryResponseDTO update(Long id, CategoryRequestDTO requestDTO) {
		
		Category category = repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Category not Found"));
		
		category.setName(requestDTO.getName());

		Category updateCategory = repository.save(category);
		
		return CategoryMapper.toResponseDTO(updateCategory);
	}
	
	//Delete Category
	public void deleteCategory(Long id) {
		
		Category category = repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Category not found"));
		
		if(transactionRepository.existsByCategoryId(id)) {
			throw new IllegalStateException("Category cannot be deleted because it is used by transactions");
		}
		repository.delete(category);
	}
}
