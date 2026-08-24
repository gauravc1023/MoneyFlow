package com.project.moneyflow.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;


public class TransactionRequestDTO {

	@NotNull(message="Amount is required")
	@Positive(message="Amount must be greater than 0")
	private Double amount;
	
	@NotBlank(message="Type is required")
	private String type;
	
	@NotBlank(message="Description is required")
	private String description;
	
	@NotNull(message="Date is required")
	private LocalDate date;
	
	@NotNull(message="Category_id is required")
	private Long category_id;
	
	public Double getAmount() {
		return amount;
	}
	
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public LocalDate getDate() {
		return date;
	}
	
	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Long getCategory_id() {
		return category_id;
	}
	
	public void setCategory_id(Long category_id) {
		this.category_id = category_id;
	}
	
	
	
	
}
