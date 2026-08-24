package com.project.moneyflow.controller;



import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.moneyflow.dto.request.LoginRequestDTO;
import com.project.moneyflow.dto.request.RegisterAdminRequestDTO;
import com.project.moneyflow.dto.request.RegisterUserRequestDTO;
import com.project.moneyflow.dto.response.LoginResponseDTO;

import com.project.moneyflow.dto.response.UserResponseDTO;
import com.project.moneyflow.service.AuthService;


import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthService service;
	
	public AuthController(AuthService service) {
		this.service = service;
		
	}
	
	
	@PostMapping("/register/user")
	public ResponseEntity<UserResponseDTO> registerUser(@RequestBody @Valid RegisterUserRequestDTO requestDTO){
		
		return ResponseEntity.ok(service.registerUser(requestDTO));
	}
	
	@PostMapping("/register/admin")
	public ResponseEntity<UserResponseDTO> registerAdmin(@RequestBody @Valid RegisterAdminRequestDTO requestDTO){
		
		return ResponseEntity.ok(service.registerAdmin(requestDTO));
	}
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO requestDTO){
		
		return ResponseEntity.ok(service.login(requestDTO)); 
	}	
	
	
}
 