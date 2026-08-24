package com.project.moneyflow.dto.response;

public class TransactionSummaryDTO {

	private Double totalIncome;
	private Double totalExpense;
	private Double balance;
	private String highestExpenseCategory;
	
	public TransactionSummaryDTO() {}

	public TransactionSummaryDTO(Double totalIncome, Double totalExpense, Double balance, String highestExpenseCategory) {
		super();
		this.totalIncome = totalIncome;
		this.totalExpense = totalExpense;
		this.balance = balance;
		this.highestExpenseCategory = highestExpenseCategory;
	}

	public Double getTotalIncome() {
		return totalIncome;
	}

	public void setTotalIncome(Double totalIncome) {
		this.totalIncome = totalIncome;
	}

	public Double getTotalExpense() {
		return totalExpense;
	}

	public void setTotalExpense(Double totalExpense) {
		this.totalExpense = totalExpense;
	}

	public Double getBalance() {
		return balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}
	
	public String getHighestExpenseCategory() {
		return highestExpenseCategory;
	}
	
	public void setHighestExpenseCategory(String highestExpenseCategory) {
		this.highestExpenseCategory = highestExpenseCategory;
	}
	
	
}
