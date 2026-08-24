package com.project.moneyflow.mapper;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public interface UserDetails {

	String getUsername();
	
	String getPassword();
	
	Collection<? extends GrantedAuthority> getAuthorities();
	
	boolean isAccountNonExpired();
	
	boolean isAccountNonLocked();
	
	boolean isCredentialsNonExpired();
	
	boolean isEnabled();
}