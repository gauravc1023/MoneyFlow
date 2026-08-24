package com.project.moneyflow.security;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.moneyflow.entity.User;
import com.project.moneyflow.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService{

	
	private final UserRepository repository;
	
	public CustomUserDetailsService(UserRepository repository) {
		this.repository =repository;
	}
	
	
	@Override
	public UserDetails loadUserByUsername(String username) {

		User user = repository.findByEmail(username) .orElseThrow(()-> new UsernameNotFoundException("User not found with email: "+username));
		
		return new CustomUserDetails(user);
	}	
}
