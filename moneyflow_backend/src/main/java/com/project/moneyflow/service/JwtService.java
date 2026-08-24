package com.project.moneyflow.service;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.project.moneyflow.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

	@Value("${jwt.secret}")
	private String secretKey;
	
	@Value("${jwt.expiration}")
	private Long jwtExpiration;
	
	
	
	//Create JWT TOKEN
	public String generateToken(User user) {
		
		return buildToken(user);
	}
	
	private String buildToken(User user) {
		
		return Jwts.builder()
				.subject(user.getEmail())
				.claim("role", user.getRole())
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + jwtExpiration))
				.signWith(getSignInKey())
				.compact(); 
	}
	
	//Get secret key
	private SecretKey getSignInKey() {
		 
		byte [] keyBytes = Decoders.BASE64.decode(secretKey);
		
		return Keys.hmacShaKeyFor(keyBytes);
	}
	
	//Extract Username from Claim
	public String extractUsername(String token) {
		
		return extractClaim(token, Claims::getSubject);
	}
	
	//Extract Expiry date from Claims
	public Date extractExpiration(String token) {
		
		return extractClaim(token, Claims::getExpiration);
	}
	
	//Extract Specific Claim from multiple Claims
	public <T> T extractClaim(String token, Function<Claims, T> resolver) {
		
		 Claims claims = extractAllClaims(token);
		 
		 return resolver.apply(claims);
	} 
	
	//Multiple Claims
	private Claims extractAllClaims(String token) {
		return Jwts
				.parser()
				.verifyWith(getSignInKey())
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}

	//Check Token is valid or not 
	public boolean isTokenValid(String token, UserDetails userDetails) {
		
		String username = extractUsername(token);
		
		return 	username.equals(userDetails.getUsername()) && !isTokenExpired(token);
	}
	
	//CHECK Token is expired or not 
	public boolean isTokenExpired(String token) {
		
		return extractExpiration(token).before(new Date());
	}
	

}
