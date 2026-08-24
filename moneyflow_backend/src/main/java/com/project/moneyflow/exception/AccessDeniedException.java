package com.project.moneyflow.exception;


@SuppressWarnings("serial")
public class AccessDeniedException  extends RuntimeException{
	public AccessDeniedException(String message) {
		super(message);
	}

}
