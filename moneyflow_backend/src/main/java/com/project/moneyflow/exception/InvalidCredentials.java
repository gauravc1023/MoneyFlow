package com.project.moneyflow.exception;

public class InvalidCredentials extends RuntimeException{

	public InvalidCredentials(String message) {
		super(message);
	}
}
