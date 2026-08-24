package com.project.moneyflow.dto.response;


public class MonthlySummaryResponseDTO {
	
	private String Month;
	private Double totalIncome;
	private Double totalExpense;
	private Double balance;
	private Long transactionCount;
	private String highestExpenseCategory;
	
	public MonthlySummaryResponseDTO() {}
	
	public MonthlySummaryResponseDTO(String month, Double totalIncome, Double totalExpance, Double balance,
			Long transactionCount, String highestExpenseCategory) {
		super();
		Month = month;
		this.totalIncome = totalIncome;
		this.totalExpense = totalExpance;
		this.balance = balance;
		this.transactionCount = transactionCount;
		this.highestExpenseCategory = highestExpenseCategory;
	}

	public String getMonth() {
		return Month;
	}

	public void setMonth(String month) {
		Month = month;
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

	public Long getTransactionCount() {
		return transactionCount;
	}

	public void setTransactionCount(Long transactionCount) {
		this.transactionCount = transactionCount;
	}

	public String getHighestExpenseCategory() {
		return highestExpenseCategory;
	}

	public void setHighestExpenseCategory(String highestExpenseCategory) {
		this.highestExpenseCategory = highestExpenseCategory;
	}
	
}
