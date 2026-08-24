package com.project.moneyflow.service;

import org.springframework.stereotype.Service;

import com.project.moneyflow.dto.response.AdminSummaryResponseDTO;
import com.project.moneyflow.entity.Transaction;
import com.project.moneyflow.exception.ResourceNotFoundException;
import com.project.moneyflow.repository.TransactionRepository;
import com.project.moneyflow.repository.UserRepository;

@Service
public class AdminService {

	private final UserRepository userRepository;
	private final TransactionRepository transactionRepository;
	
	public AdminService(UserRepository userRepository, TransactionRepository transactionRepository) {
		this.userRepository = userRepository;
		this.transactionRepository = transactionRepository;
	}
	
	public AdminSummaryResponseDTO getAdminSummary() {
		
		Long totalUsers = userRepository.count();
		
		Long totalTransactions = transactionRepository.getTotalTransaction();
		
		Double totalIncome = transactionRepository.getTotalIncome();
		
		Double totalExpense = transactionRepository.getTotalExpense();
		
		Double balance = totalIncome - totalExpense;
		
		
		return new AdminSummaryResponseDTO(totalUsers, totalTransactions,totalIncome,totalExpense,balance);
		
	}
	
	//Delete Transaction
	public void deleteTransaction(Long id) {

	    Transaction transaction = transactionRepository.findById(id)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Transaction not found"));

	    transactionRepository.delete(transaction);
	}
}
