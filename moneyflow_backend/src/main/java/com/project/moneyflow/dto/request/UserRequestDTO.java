package com.project.moneyflow.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;

public class UserRequestDTO {
	
	@NotBlank(message="Name cannot be blank")
	private String name;
	
	@NotBlank(message="Enter valid email ")
	@Email(message="Email is required")
	private String Email;
	
	@Size(min=6,message="password must contain atleast 6 characters")
	private String password;

	private String role;
	
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return Email;
	}

	public void setEmail(String email) {
		Email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}	
	
}
