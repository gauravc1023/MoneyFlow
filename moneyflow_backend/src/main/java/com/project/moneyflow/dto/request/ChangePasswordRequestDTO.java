package com.project.moneyflow.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ChangePasswordRequestDTO {

	@NotBlank
	private String currentPassword;
	
	@NotBlank
	@Size(min=6, message = "Password must contain atleast 6 characters")
	private String newPassword;
	
	@NotBlank
	private String confirmPassword;
	
	public ChangePasswordRequestDTO() {}

	public ChangePasswordRequestDTO(@NotBlank String currentPassword,
			@NotBlank @Size(min = 6, message = "Password must contain atleast 6 characters") String newPassword,
			@NotBlank String confirmPassword) {
		super();
		this.currentPassword = currentPassword;
		this.newPassword = newPassword;
		this.confirmPassword = confirmPassword;
	}

	public String getCurrentPassword() {
		return currentPassword;
	}

	public void setCurrentPassword(String currentPassword) {
		this.currentPassword = currentPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	
	
}
