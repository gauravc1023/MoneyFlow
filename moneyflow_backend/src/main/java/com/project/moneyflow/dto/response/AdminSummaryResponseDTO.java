package com.project.moneyflow.dto.response;

public class AdminSummaryResponseDTO {

	private Long totalUsers;
	private Long totalTransactions;
	private Double totalIncome;
	private Double totalExpense;
	private Double balance;
	
	public AdminSummaryResponseDTO() {}

	public AdminSummaryResponseDTO(Long totalUsers, Long totalTransactions, Double totalIncome, Double totalExpense,
			Double balance) {
		super();
		this.totalUsers = totalUsers;
		this.totalTransactions = totalTransactions;
		this.totalIncome = totalIncome;
		this.totalExpense = totalExpense;
		this.balance = balance;
	}

	public Long getTotalUsers() {
		return totalUsers;
	}

	public void setTotalUsers(Long totalUsers) {
		this.totalUsers = totalUsers;
	}

	public Long getTotalTransactions() {
		return totalTransactions;
	}

	public void setTotalTransactions(Long totalTransactions) {
		this.totalTransactions = totalTransactions;
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
	
	
	
}
