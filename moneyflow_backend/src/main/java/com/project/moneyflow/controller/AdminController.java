package com.project.moneyflow.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.project.moneyflow.dto.response.AdminSummaryResponseDTO;
import com.project.moneyflow.dto.response.TransactionResponseDTO;
import com.project.moneyflow.dto.response.UserResponseDTO;
import com.project.moneyflow.service.AdminService;
import com.project.moneyflow.service.TransactionService;
import com.project.moneyflow.service.UserService;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

	private final UserService service;
	private final AdminService adminService;
	private final TransactionService transactionService;
	
	public AdminController(UserService service, AdminService adminService, TransactionService transactionService) {
		this.service = service;
		this.adminService = adminService;
		this.transactionService = transactionService;
	}
	
	@GetMapping("/users")
	public ResponseEntity<List<UserResponseDTO>> getAllUsers(){
			return ResponseEntity.ok(service.getAllUser());
	}
	
	@GetMapping("/users/{userId}/transactions")
	public ResponseEntity<List<TransactionResponseDTO>> getUserTransaction(@PathVariable Long userId){
		
		return ResponseEntity.ok(transactionService.getTransactionsByUserId(userId));
	}
	
	@GetMapping("/transactions")
	public ResponseEntity<List<TransactionResponseDTO>> getAllTransactions(){
		 	return ResponseEntity.ok(transactionService.getAllTransactions());
	}
	

	@PutMapping("/user/{id}/role")
	public ResponseEntity<UserResponseDTO> updateRole(@PathVariable Long id,@RequestParam String role){
		return ResponseEntity.ok(service.updateRole(id, role));
		
	}
	
	@DeleteMapping("users/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Long id){
		
		service.deleteUser(id);
		
		return ResponseEntity.ok("User deleted Successfully");	
	}
	
	@GetMapping("/summary")
	public ResponseEntity<AdminSummaryResponseDTO> getAdminSummary(){
		return ResponseEntity.ok(adminService.getAdminSummary());
	}
	
	@DeleteMapping("/transactions/{id}")
	public String delete(@PathVariable Long id) {
		adminService.deleteTransaction(id);
		
		return "Transaction deleted successfully";
	}
	
	
}
