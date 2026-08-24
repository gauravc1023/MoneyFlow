package com.project.moneyflow.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.moneyflow.dto.request.LoginRequestDTO;
import com.project.moneyflow.dto.request.RegisterAdminRequestDTO;
import com.project.moneyflow.dto.request.RegisterUserRequestDTO;
import com.project.moneyflow.dto.response.LoginResponseDTO;
import com.project.moneyflow.dto.response.UserResponseDTO;
import com.project.moneyflow.entity.User;
import com.project.moneyflow.exception.EmailAlreadyExitException;
import com.project.moneyflow.exception.InvalidAdminKeyException;
import com.project.moneyflow.exception.InvalidCredentials;
import com.project.moneyflow.exception.PasswordMismatchException;
import com.project.moneyflow.exception.ResourceNotFoundException;
import com.project.moneyflow.mapper.UserMapper;
import com.project.moneyflow.repository.UserRepository;

@Service
public class AuthService {

	public final UserRepository repository;
	public final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	
	public AuthService(UserRepository repository, PasswordEncoder passwordEncoder,JwtService jwtService) {
		this.repository=repository;
		this.passwordEncoder=passwordEncoder;
		this.jwtService=jwtService;
	}
	
	//REGISTER USER
	public UserResponseDTO registerUser(RegisterUserRequestDTO requestDTO) {
		
//		System.out.println("Inside register USER ()");
		
		//Check Email is already exits
		Optional<User> existingUser = repository.findByEmail(requestDTO.getEmail());
		 
		if(existingUser.isPresent()) throw new EmailAlreadyExitException("Email already exist");
		
		//Check Password and Confirm Password
		if(!requestDTO.getPassword().equals(requestDTO.getConfirmPassword())) {
			throw new PasswordMismatchException("Passwords are not matched");
		}
		
		//Convert DTO to entity
		User user = UserMapper.toEntity(requestDTO);
		
		//Set role
		user.setRole("USER");
		user.setPassword(passwordEncoder.encode(requestDTO.getPassword()));		
		
		//Save User
		User savedUser = repository.save(user);
		
		//Convert entity to respose DTO
		return UserMapper.toResponseDTO(savedUser);
		
	}
	
	//REGISTER ADMIN()
	public UserResponseDTO registerAdmin(RegisterAdminRequestDTO requestDTO) {
		
		System.out.println("Inside register ADMIN ()");
		
		//Check Email is already exits
		Optional<User> existingUser = repository.findByEmail(requestDTO.getEmail());
		 
		if(existingUser.isPresent()) throw new EmailAlreadyExitException("Email already exist");
		
		//Check Password and Confirm Password
		if(!requestDTO.getPassword().equals(requestDTO.getConfirmPassword())) {
			throw new PasswordMismatchException("Passwords are not matched");
		}

		
		//Validate Admin key	
		if(!requestDTO.getAdminKey().equals("ADMIN@123")) {
			throw new InvalidAdminKeyException("Invalid Admin Secret Key");
		}
		
		
		//Convert DTO to entity
		User user = UserMapper.toEntity(requestDTO);
		
		//Set role
		user.setRole("ADMIN");
		user.setPassword(passwordEncoder.encode(requestDTO.getPassword()));		
		
		//Save User

		User savedUser = repository.save(user);
		
		//Convert entitty to respose DTO
		return UserMapper.toResponseDTO(savedUser);
		
	}
	
	//LOGIN()
	public LoginResponseDTO login(LoginRequestDTO requestDTO) {
		
		//Check EMAIL
		User user = repository.findByEmail(requestDTO.getEmail()) .orElseThrow(()->new ResourceNotFoundException("User Not Found"));
		System.out.println(user.getEmail());
		System.out.println(user.getPassword());
		
		//CHECK PASSWORD
		if(!passwordEncoder.matches(requestDTO.getPassword(),user.getPassword())) {
			throw new InvalidCredentials("Invalid Email or Password");
		}	
		
		//JWT token Generated
		String token = jwtService.generateToken(user);
		
		return new LoginResponseDTO(token,"Bearer",user.getId(),user.getName(),user.getEmail(),user.getRole());
	}
	
	//	forgotPassword();
	
	//	resetPassword()
}
