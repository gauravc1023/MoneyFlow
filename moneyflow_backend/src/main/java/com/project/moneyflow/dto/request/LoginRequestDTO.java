package com.project.moneyflow.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LoginRequestDTO {

	@NotBlank(message="Enter a valid email")
	@Email(message="Email is required")
	private String email;
	@NotBlank(message="Password is required")
	@Size(min=6, message="password must contain at least 6 characters")
	private String password;

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
		
}
