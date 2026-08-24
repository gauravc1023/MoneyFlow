package com.project.moneyflow.mapper;



import com.project.moneyflow.dto.request.TransactionRequestDTO;
import com.project.moneyflow.dto.response.TransactionResponseDTO;
import com.project.moneyflow.entity.Transaction;


public class TransactionMapper {

	public static Transaction toEntity(TransactionRequestDTO requestDTO) {
		
		Transaction transaction = new Transaction();
		
		transaction.setAmount(requestDTO.getAmount());
		transaction.setType(requestDTO.getType());
		transaction.setDescription(requestDTO.getDescription());
		transaction.setDate(requestDTO.getDate());
		
		return transaction;
	}
	
	public static TransactionResponseDTO toResponseDTO(Transaction transaction) {
		
		TransactionResponseDTO responseDTO = new TransactionResponseDTO();
		
		responseDTO.setId(transaction.getId());
		responseDTO.setAmount(transaction.getAmount());
		responseDTO.setType(transaction.getType());
		responseDTO.setDescription(transaction.getDescription());
		responseDTO.setDate(transaction.getDate());
		responseDTO.setCategoryName(transaction.getCategory().getName());
		responseDTO.setUserName(transaction.getUser().getName());
		
		return responseDTO;
	}
}
