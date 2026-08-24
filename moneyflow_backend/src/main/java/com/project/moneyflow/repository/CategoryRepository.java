package com.project.moneyflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.moneyflow.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{

	boolean existsByName(String name);
}
