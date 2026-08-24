package com.project.moneyflow.service;


import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.project.moneyflow.dto.request.TransactionRequestDTO;
import com.project.moneyflow.dto.response.MonthlySummaryResponseDTO;
import com.project.moneyflow.dto.response.TransactionResponseDTO;
import com.project.moneyflow.dto.response.TransactionSummaryDTO;
import com.project.moneyflow.entity.Category;
import com.project.moneyflow.entity.Transaction;
import com.project.moneyflow.entity.User;
import com.project.moneyflow.exception.AccessDeniedException;
import com.project.moneyflow.exception.ResourceNotFoundException;
import com.project.moneyflow.mapper.TransactionMapper;
import com.project.moneyflow.repository.CategoryRepository;
import com.project.moneyflow.repository.TransactionRepository;
import com.project.moneyflow.repository.UserRepository;


@Service
public class TransactionService {

	private final TransactionRepository repository;
	private final UserRepository userRepository;
	private final CategoryRepository categoryRepository;
	
	public TransactionService(TransactionRepository repository, UserRepository userRepository, CategoryRepository categoryRepository) {
		this.repository=repository;
		this.userRepository=userRepository;
		this.categoryRepository=categoryRepository;
	}
	
	//save 
	public TransactionResponseDTO save(TransactionRequestDTO requestDTO) {
		
        	String email = SecurityContextHolder.getContext().getAuthentication().getName();
		
			User user = userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User not Found"));
			
			Category category = categoryRepository.findById(requestDTO.getCategory_id()).orElseThrow(()->new ResourceNotFoundException("Category not Found"));
			
				Transaction transaction = TransactionMapper.toEntity(requestDTO);
				transaction.setUser(user);
				transaction.setCategory(category);
				
				Transaction savedTransaction = repository.save(transaction);
				
				return TransactionMapper.toResponseDTO(savedTransaction);
    }
	
	//getAllTrasaction
	public List<TransactionResponseDTO> getAllTransactions() {
        
		List<Transaction> list = repository.findAll();
		
		List<TransactionResponseDTO> responseList = new ArrayList<>();
		
		for(Transaction transaction : list) {
				
				responseList.add(TransactionMapper.toResponseDTO(transaction));
				
		}
		
		return responseList;
		
    }
	
	//getTransaction
	public TransactionResponseDTO getTransaction(Long id) {
		 
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		
		User user = userRepository.findByEmail(email).orElseThrow(()-> new ResourceNotFoundException("User not found"));
		
		Transaction transaction = repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Transaction not found"));
		
		if (!transaction.getUser().getId().equals(user.getId())) {
		    throw new AccessDeniedException("You are not allowed to access this transaction");
		}
		
		return TransactionMapper.toResponseDTO(transaction);
		
	}
	
	//Get Current User Transaction 
	public List<TransactionResponseDTO> getUserTransactions() {
		
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		
		User user = userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User not found"));
		
		List<Transaction> transactions = repository.findByUserId(user.getId());

	    List<TransactionResponseDTO> responseList = new ArrayList<>();

	    for (Transaction transaction : transactions) {

	        responseList.add(TransactionMapper.toResponseDTO(transaction));
	    }

	    return responseList;
		                          
    }
	
	//Get All Transaction Of User
	public List<TransactionResponseDTO> getTransactionsByUserId(Long userId){
		User user = userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("User not found"));
		
		List<Transaction> transactions = repository.findByUserId(user.getId());
		
		List<TransactionResponseDTO> responseList = new ArrayList<>();
		
		for(Transaction transaction : transactions) {
			responseList.add(TransactionMapper.toResponseDTO(transaction));
		}
		
		return responseList;
	}
	
	//Transaction Summary
	public TransactionSummaryDTO getTransactionSummary() {
		
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		
		User user = userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User not found"));
		
		Double totalIncome = repository.sumAmountByUserIdAndType(user.getId(), "INCOME");
		Double totalExpense = repository.sumAmountByUserIdAndType(user.getId(), "EXPENSE");
		Double balance = totalIncome - totalExpense;
		
		List<Object[]> categoryExpenses = repository.findExpenseByCategory(user.getId());
		
		String highestExpenseCategory = null;
		Double highestExpenseAmount = 0.0;

		for (Object[] row : categoryExpenses) {

		    String categoryName = (String) row[0];
		    Double amount = ((Number) row[1]).doubleValue();

		    if (amount > highestExpenseAmount) {
		        highestExpenseAmount = amount;
		        highestExpenseCategory = categoryName;
		    }
		}
		
		
		
		TransactionSummaryDTO summary = new TransactionSummaryDTO();
		summary.setTotalIncome(totalIncome);
		summary.setTotalExpense(totalExpense);
		summary.setBalance(balance);
		summary.setHighestExpenseCategory(highestExpenseCategory);
		
		return summary;
	}
	
	//updateTransaction
	public TransactionResponseDTO updateTransaction(Long id, TransactionRequestDTO requestDTO) {
		
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		
		Transaction transaction =  repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Transaction not found"));
		User user = userRepository.findByEmail(email).orElseThrow(() ->new ResourceNotFoundException("User not found"));
		
		if (!transaction.getUser().getId().equals(user.getId())) {
		    throw new AccessDeniedException("You are not allowed to update this transaction");
		}
		
		Category category = categoryRepository.findById(requestDTO.getCategory_id()).orElseThrow(() ->new ResourceNotFoundException("Category not found"));
		
		transaction.setAmount(requestDTO.getAmount());
		transaction.setType(requestDTO.getType());    
		transaction.setDescription(requestDTO.getDescription());
		transaction.setDate(requestDTO.getDate());
		transaction.setCategory(category);
		
		Transaction updatedTransaction = repository.save(transaction);
	
		return TransactionMapper.toResponseDTO(updatedTransaction);
	}
	
	//Delete Transaction
	public void deleteTransaction(Long id) {
		
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		
		User user = userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User not found"));
		
		Transaction transaction = repository.findById(id).orElseThrow(()->new ResourceNotFoundException("Transaction not Found")); 
	
		if(!transaction.getUser().getId().equals(user.getId())) {
			throw new AccessDeniedException("You are not allowed to delete this transaction");
		}
		
		repository.delete(transaction);
	} 
	
	//Monthly summary
	public MonthlySummaryResponseDTO getMonthlySummary(int year, int month) {
		
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		
		User user = userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("User not found"));
		
		YearMonth yearMonth = YearMonth.of(year, month);
		
		LocalDate startDate = yearMonth.atDay(1);
		
		LocalDate endDate = yearMonth.atEndOfMonth();
		
		//Fetch the month's transactions
		List<Transaction> transactions = repository.findByUserIdAndDateBetween(user.getId(), startDate, endDate);
		
		double totalIncome = 0;
		double totalExpense = 0;
		
		for(Transaction transaction : transactions) {
			
			if("INCOME".equalsIgnoreCase(transaction.getType())) {
				totalIncome += transaction.getAmount();
			}
			
			if("EXPENSE".equalsIgnoreCase(transaction.getType())) {
				totalExpense += transaction.getAmount();
			}
		}
		double balance = totalIncome - totalExpense;
		long  transactionCount = transactions.size();
		
		Map<String, Double> expenseByCategory = new HashMap<>();
		
		for(Transaction transaction : transactions)
		{
			if("EXPENSE".equalsIgnoreCase(transaction.getType())) {
				
				String categoryName = transaction.getCategory().getName();
				
				expenseByCategory.put(categoryName, expenseByCategory.getOrDefault(categoryName, 0.0)+transaction.getAmount());
			}
		}
		
		String highestExpenseCategory = null;
		double highestExpenseAmount = 0;
		
		for(Map.Entry<String, Double> entry : expenseByCategory.entrySet()) {
			if(entry.getValue() > highestExpenseAmount) {
				highestExpenseAmount = entry.getValue();
				highestExpenseCategory = entry.getKey();
			}
		}
		
		MonthlySummaryResponseDTO response = new MonthlySummaryResponseDTO();
		
		response.setMonth(yearMonth.toString());
		response.setTotalIncome(totalIncome);
		response.setTotalExpense(totalExpense);
		response.setBalance(balance);
		response.setTransactionCount(transactionCount);
		response.setHighestExpenseCategory(highestExpenseCategory);
		
		return response;
	}
}
