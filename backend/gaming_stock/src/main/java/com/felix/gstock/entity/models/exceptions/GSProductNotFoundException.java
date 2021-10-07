package com.felix.gstock.entity.models.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;  

@ResponseStatus(HttpStatus.NOT_FOUND)
public class GSProductNotFoundException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;

	public GSProductNotFoundException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}
}
