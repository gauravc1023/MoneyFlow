package com.project.moneyflow.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.moneyflow.dto.request.TransactionRequestDTO;
import com.project.moneyflow.dto.response.MonthlySummaryResponseDTO;
import com.project.moneyflow.dto.response.TransactionResponseDTO;
import com.project.moneyflow.dto.response.TransactionSummaryDTO;
import com.project.moneyflow.service.TransactionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

	private  final TransactionService service;
	
	public TransactionController(TransactionService service) {
		this.service=service;
	}
	
	@PostMapping
	public ResponseEntity<TransactionResponseDTO> save(@Valid @RequestBody TransactionRequestDTO requestDTo){
		return ResponseEntity.ok(service.save(requestDTo));
	}
	 
	@GetMapping
	public ResponseEntity<List<TransactionResponseDTO>> getAll(){
		return ResponseEntity.ok(service.getAllTransactions());
	}
	
	@GetMapping("/user")
	public ResponseEntity<List<TransactionResponseDTO>> getUserTransactions() {

	    return ResponseEntity.ok(service.getUserTransactions());
	}
	

	@GetMapping("/monthly/{year}/{month}")
	public MonthlySummaryResponseDTO getMonthlySummary(@PathVariable int year,@PathVariable int month) {
		return service.getMonthlySummary(year, month);
	}
	
	@GetMapping("/summary")
	public ResponseEntity<TransactionSummaryDTO> getTransactionSummary() {
		return ResponseEntity.ok(service.getTransactionSummary());
	}
	
		
	@GetMapping("/{id}")
	public TransactionResponseDTO getById(@PathVariable Long id) {
		return service.getTransaction(id);
	}
	
	
	
	@PutMapping("/{id}")
	public TransactionResponseDTO update(
			@PathVariable Long id,@Valid @RequestBody TransactionRequestDTO requestDTO) {
		return service.updateTransaction(id, requestDTO);
	}
	
	
	@DeleteMapping("/{id}")
	public String delete(@PathVariable Long id) {
		service.deleteTransaction(id);
		
		return "Transaction deleted successfully";
	}
}
