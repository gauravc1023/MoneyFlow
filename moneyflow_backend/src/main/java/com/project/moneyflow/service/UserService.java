package com.project.moneyflow.service;



import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.moneyflow.dto.request.ChangePasswordRequestDTO;
import com.project.moneyflow.dto.request.UpdateProfileRequestDTO;
import com.project.moneyflow.dto.request.UserRequestDTO;
import com.project.moneyflow.dto.response.UserResponseDTO;
import com.project.moneyflow.entity.User;
import com.project.moneyflow.exception.AccessDeniedException;
import com.project.moneyflow.exception.ResourceNotFoundException;
import com.project.moneyflow.mapper.UserMapper;
import com.project.moneyflow.repository.UserRepository;

@Service
public class UserService { 

	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;
	
	public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
		this.repository=repository;
		this.passwordEncoder = passwordEncoder;
	}
	
	//Save
	public UserResponseDTO save(UserRequestDTO requestDTO) { 
		
		User user = UserMapper.toEntity(requestDTO);
		user.setRole("USER");
		
		User saveUser = repository.save(user);
		
		return UserMapper.toResponseDTO(saveUser);
		
	}
	
	//Get All User
	public List<UserResponseDTO> getAllUser(){
		List<User> users = repository.findAll();
		
		List<UserResponseDTO> responseList = new ArrayList<>();
		
		for(User user: users) {
		
			responseList.add(UserMapper.toResponseDTO(user));
			
		}
		
		return responseList;
	}
	
	
	//Get User
	public UserResponseDTO getUser(Long id) {
		
		User user =  repository.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found"));
		
		return UserMapper.toResponseDTO(user);
	}
	
	//Get User By Email
	public UserResponseDTO getUserByEmail(String email) {
		
		User user = repository.findByEmail(email).orElseThrow( () -> new ResourceNotFoundException("User not found"));
		
		return UserMapper.toResponseDTO(user);
		
	}
	
	//Get Current User Profile
	public UserResponseDTO getProfile() {
		
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		
		User user = repository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User not found"));
		
		return UserMapper.toResponseDTO(user);
	}
	
	//Update User Profile
	public UserResponseDTO updateProfile(
	        String currentEmail,
	        UpdateProfileRequestDTO request) {

	    User user = repository.findByEmail(currentEmail)
	            .orElseThrow(() ->
	                new RuntimeException("User not found"));

	    user.setName(request.getName());
	    user.setEmail(request.getEmail());

	    User updatedUser = repository.save(user);

	    return UserMapper.toResponseDTO(updatedUser);
	}
	
	//Update
	public UserResponseDTO updateUser(Long id, UserRequestDTO requestDTo) {

		User existingUser = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		
		existingUser.setName(requestDTo.getName());
		existingUser.setEmail(requestDTo.getEmail());
		
		User updateUser = repository.save(existingUser);
		
		return UserMapper.toResponseDTO(updateUser);
	}
	
	//Delete
	public void deleteUser(Long id) {
		
		User user = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		 
		repository.delete(user);
	}
	
	
	
	//Update Role
	public UserResponseDTO updateRole(Long id, String role) {

		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		
		User logedInUser = repository.findByEmail(email).orElse(null);
		if(id.equals(logedInUser.getId())) {
			throw new AccessDeniedException("You can't change your own role");
		}
		
	    User user = repository.findById(id)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("User not found"));

	    user.setRole(role);

	    User updatedUser = repository.save(user);

	    return UserMapper.toResponseDTO(updatedUser);
	}
	
	//Change Password
	public void changePassword(ChangePasswordRequestDTO requestSTO) {
		
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		
		User user = repository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User not found"));
		
		//Check current password
		if(!passwordEncoder.matches(requestSTO.getCurrentPassword(),user.getPassword())) {
			throw new IllegalArgumentException("Current password is incorrect");
		}
		
		//Check new password and confirm password
		if(!requestSTO.getNewPassword().equals(requestSTO.getConfirmPassword())) {
			throw new IllegalArgumentException("New password and Confirm password do not match");
		}
		
		//Prevent using the same password
		if(passwordEncoder.matches(requestSTO.getNewPassword(), user.getPassword())) {
			throw new IllegalArgumentException("New password must be different from current password");
		}
		
		//Encode new Password
		user.setPassword(passwordEncoder.encode(requestSTO.getNewPassword()));
		
		repository.save(user);
	}
}
