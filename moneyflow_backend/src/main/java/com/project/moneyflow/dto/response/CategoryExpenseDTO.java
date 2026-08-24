package com.project.moneyflow.dto.response;

public class CategoryExpenseDTO {

	private String category;
	private Double amount;
	
	public CategoryExpenseDTO() {}

	public CategoryExpenseDTO(String category, Double amount) {
		super();
		this.category = category;
		this.amount = amount;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}
	
	
}
