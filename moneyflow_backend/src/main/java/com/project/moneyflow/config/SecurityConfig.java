package com.project.moneyflow.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
 
import com.project.moneyflow.security.JwtAuthenticationFilter;
@Configuration
@EnableMethodSecurity
public class SecurityConfig {

	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	
	public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
		this.jwtAuthenticationFilter = jwtAuthenticationFilter;	
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		
		return new BCryptPasswordEncoder();
	}
	
	 @Bean
	 public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

	        http.csrf(csrf -> csrf.disable())
	        
	        	.cors(cors -> {})
	        	.authorizeHttpRequests(auth -> auth
	        			.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
	        			.requestMatchers("/api/auth/**").permitAll()
	        			// Users + Admins can view categories
	        	        .requestMatchers(HttpMethod.GET, "/api/categories/**").authenticated()
	        	        .requestMatchers(HttpMethod.POST, "/api/categories").authenticated()

	        	        // Only Admin can create/update/delete categories
	        	        .requestMatchers(HttpMethod.PUT, "/api/categories/**").hasRole("ADMIN")
	        	        .requestMatchers(HttpMethod.DELETE, "/api/categories/**").hasRole("ADMIN")
	        			.requestMatchers("/api/admin/**").hasRole("ADMIN")
	        			
	        			.anyRequest().authenticated() )
	        	
	        	 .exceptionHandling(exception -> exception.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
	        			 						.accessDeniedHandler((request, response,accessDeniedException)->{response.setStatus(HttpStatus.FORBIDDEN.value());
	        			 						}) 
	        			 			)
	        	 
	        	.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
	        
	        return http.build();
	 }
	 
	 @Bean
	 public CorsConfigurationSource corsConfigurationSource() {
		 
		 CorsConfiguration configuration = new CorsConfiguration();
		 
		 configuration.setAllowedOriginPatterns( List.of("https://moneyflow-1-bngs.onrender.com") );
		 
		 configuration.setAllowedMethods( List.of("GET","POST","PUT","DELETE","OPTIONS"));
		 
		 configuration.setAllowedHeaders( List.of("*"));
		 
		 configuration.setAllowCredentials(true);
		 
		 UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		 
		 source.registerCorsConfiguration("/**", configuration);
		  
		 return source;
	 }
}
