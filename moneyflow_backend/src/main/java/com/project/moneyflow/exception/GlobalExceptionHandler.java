package com.project.moneyflow.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex){
		
		ErrorResponse resp = new ErrorResponse(HttpStatus.NOT_FOUND.value(),ex.getMessage(),LocalDateTime.now());
		
		return new ResponseEntity<>(resp,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> handleValidationException(MethodArgumentNotValidException ex) {

	    Map<String, String> errors = new HashMap();
	    
	    BindingResult bindingResult = ex.getBindingResult();
	    
	    List<ObjectError> allErrors = bindingResult.getAllErrors();
	    
	    for(ObjectError error: allErrors){
	    	
	    	FieldError fieldError = (FieldError)error;
	    	
	    	String fieldName = fieldError.getField();
	    	
	    	String message = fieldError.getDefaultMessage();
	    	
	    	errors.put(fieldName,message);
	    }
	    
	    return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleException(Exception ex){
		ErrorResponse response = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage(), LocalDateTime.now());
		
		return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(InvalidCredentials.class)
	public ResponseEntity<ErrorResponse> handleInvalidCredentials(InvalidCredentials ex){
		ErrorResponse error = new ErrorResponse();
		
		error.setStatus(401);
		error.setMessage(ex.getMessage());
		error.setTimestamp(LocalDateTime.now());
		 
		return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
	}
	
	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<String> handleAccessDenied(AccessDeniedException ex){
		
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
	}
}
