package com.project.moneyflow.mapper;

import com.project.moneyflow.dto.request.CategoryRequestDTO;
import com.project.moneyflow.dto.response.CategoryResponseDTO;
import com.project.moneyflow.entity.Category;

public class CategoryMapper {

	public static Category toEntity(CategoryRequestDTO requestDTO) {
		
		Category category = new Category();
		
		category.setName(requestDTO.getName());
		
		return category;
	}
	
	public static CategoryResponseDTO toResponseDTO(Category category) {
		
		CategoryResponseDTO responseDTO = new CategoryResponseDTO();
		
		responseDTO.setId(category.getId());
		responseDTO.setName(category.getName());
		
		return responseDTO;
	}
}
