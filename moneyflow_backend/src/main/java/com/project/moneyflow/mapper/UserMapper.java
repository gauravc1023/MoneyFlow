package com.project.moneyflow.mapper;

import com.project.moneyflow.dto.request.RegisterAdminRequestDTO;
import com.project.moneyflow.dto.request.RegisterUserRequestDTO;
import com.project.moneyflow.dto.request.UserRequestDTO;
import com.project.moneyflow.dto.response.UserResponseDTO;
import com.project.moneyflow.entity.User;

public class UserMapper {

	//UserRequest to Entity
	public static User toEntity(UserRequestDTO dto) {
		
		User user = new User();
		
		user.setName(dto.getName());
		user.setEmail(dto.getEmail());
		user.setPassword(dto.getPassword());
		
		return user;
	}
	
	public static UserResponseDTO toResponseDTO(User user) {
		
		UserResponseDTO response = new UserResponseDTO();
		
		response.setId(user.getId());
		response.setName(user.getName());
		response.setEmail(user.getEmail());
		response.setRole(user.getRole());
		
		return response;
		
	}

	//Register User Request to Entity
	public static User toEntity(RegisterUserRequestDTO rgRequestDTO) {
			
		User user = new User();
		
		user.setName(rgRequestDTO.getName());
		user.setEmail(rgRequestDTO.getEmail());
		
		return user;
	}
	
	//Register Admin Request to Entity
	public static User toEntity(RegisterAdminRequestDTO rgRequestDTO) {
		
		User user = new User();
		
		user.setName(rgRequestDTO.getName());
		user.setEmail(rgRequestDTO.getEmail());
		
		return user;
	}
}
