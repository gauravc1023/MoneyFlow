package com.project.moneyflow.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.moneyflow.dto.request.ChangePasswordRequestDTO;
import com.project.moneyflow.dto.request.UpdateProfileRequestDTO;
import com.project.moneyflow.dto.request.UserRequestDTO;
import com.project.moneyflow.dto.response.UserResponseDTO;
import com.project.moneyflow.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private final UserService service;
	
	public UserController(UserService service) {
		this.service=service;
	}
	 
	@PostMapping
	public ResponseEntity<UserResponseDTO> save(@Valid @RequestBody UserRequestDTO requestDTO){
		return ResponseEntity.ok(service.save(requestDTO));
	}
	 
	@GetMapping
	public ResponseEntity<List<UserResponseDTO>> getAll(){
		return ResponseEntity.ok(service.getAllUser());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<UserResponseDTO> getById(@PathVariable Long id){
		return ResponseEntity.ok(service.getUser(id));
	}
	
	@GetMapping("/email/{email}")
	public ResponseEntity<UserResponseDTO> getUserByEmail(@PathVariable String email){
		return ResponseEntity.ok(service.getUserByEmail(email));
	}
	
	@GetMapping("/me")
	public ResponseEntity<UserResponseDTO> getProfile(){
		return ResponseEntity.ok(service.getProfile());
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<UserResponseDTO> update(@PathVariable Long id,@Valid @RequestBody UserRequestDTO user){
		return ResponseEntity.ok(service.updateUser(id, user));
	}
		
	
	@PutMapping("/change-password")
	public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequestDTO requestDTO){
		
		service.changePassword(requestDTO);
		
		return ResponseEntity.ok("Password changed successfully");
		
	}
	
	@PutMapping("/profile")
	public ResponseEntity<UserResponseDTO> updateProfile(
	        @RequestBody UpdateProfileRequestDTO request,
	        Authentication authentication) {

	    String email = authentication.getName();

	    return ResponseEntity.ok(
	        service.updateProfile(email, request)
	    );
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete( @PathVariable Long id){
		service.deleteUser(id);
		
		return ResponseEntity.ok("User deleted successfully");
	}
}
