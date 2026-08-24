package com.project.moneyflow.repository;

import org.springframework.stereotype.Repository;

import com.project.moneyflow.entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface UserRepository extends JpaRepository<User,Long>{

	Optional<User> findByEmail(String email);	
}	
