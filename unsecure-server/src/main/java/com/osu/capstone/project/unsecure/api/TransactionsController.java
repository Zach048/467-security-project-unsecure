/**
 * 
 */
package com.osu.capstone.project.unsecure.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.osu.capstone.project.unsecure.dao.TransactionsDAO;
import com.osu.capstone.project.unsecure.dto.Transactions;

/**
 * Responsible for providing the server-side RESTful interface for the {@link Transactions} DTO.
 * @author Zach Earl
 */
@RestController
@RequestMapping("transactions")
public class TransactionsController {
	
	@Autowired
	TransactionsDAO dao;
	
	@CrossOrigin(origins="*")
	@GetMapping("account/{accountId}")
	public List<Transactions> getTransactions(@PathVariable Integer accountId) {
		return dao.getTransactions(accountId);
	}
	
	@CrossOrigin(origins="*")
	@PostMapping("newTransaction")
	public void newTransaction(@RequestBody Transactions t) {
		dao.addTransaction(t);
	}
	
	@CrossOrigin(origins="*")
	@PutMapping("updateTransaction")
	public void updateTransaction(@RequestBody Transactions t) {
		dao.updateTransaction(t);
	}

}
