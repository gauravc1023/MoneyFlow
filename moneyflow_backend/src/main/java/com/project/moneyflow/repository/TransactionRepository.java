package com.project.moneyflow.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.moneyflow.entity.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long>{

	
	List<Transaction> findByUserId(Long userId);
	
	List<Transaction> findByUserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
	
	@Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.user.id = :userId AND t.type = :type")
	Double sumAmountByUserIdAndType(@Param("userId") Long userId,@Param("type") String type);

	@Query("SELECT t.category.name, SUM(t.amount)  FROM Transaction t WHERE t.user.id = :userId AND t.type = 'EXPENSE' GROUP BY t.category.name")
	List<Object []> findExpenseByCategory(@Param("userId") Long userId);
	
	@Query("SELECT COALESCE(SUM(t.amount),0) FROM Transaction t WHERE t.type = 'INCOME'")
	Double getTotalIncome();
	
	@Query("SELECT COALESCE(SUM(t.amount),0) FROM Transaction t WHERE t.type = 'EXPENSE'")
	Double getTotalExpense();
	
	@Query("SELECT COUNT(t) FROM Transaction t")
	Long getTotalTransaction();
	
	
	boolean existsByCategoryId(Long categoryId);
}
