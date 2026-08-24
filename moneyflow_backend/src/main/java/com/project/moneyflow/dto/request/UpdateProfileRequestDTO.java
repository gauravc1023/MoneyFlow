package com.project.moneyflow.dto.request;

public class UpdateProfileRequestDTO {

	 	private String name;
	 
	    private String email;

	    public UpdateProfileRequestDTO() {
	    }

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
}
