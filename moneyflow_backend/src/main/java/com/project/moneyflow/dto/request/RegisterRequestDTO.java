package com.project.moneyflow.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequestDTO { 

	@NotBlank(message="Name cannot be empty")
	private String name;
	
	@NotBlank(message="Enter a valid email")
	@Email(message="Email is required")
	private String email;
	
	@NotBlank(message="Password is required")
	@Size(min=6, message="password must contain at least 6 characters")
	private String password;
	
	@NotBlank(message = "Confirm password is required")
	private String confirmPassword;
	
	@NotBlank(message = "Role is required")
	private String role;
	
	private String adminKey;
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getConfirmPassword() {
		return confirmPassword;
	}
	
	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	
	public String getRole() {
		return role;
	}
	
	public void setRole(String role) {
		this.role = role;
	}
	
	public String getAdminKey() {
		return adminKey;
	}
	
	public void setAdminKey(String adminKey) {
		this.adminKey = adminKey;
	}
}
