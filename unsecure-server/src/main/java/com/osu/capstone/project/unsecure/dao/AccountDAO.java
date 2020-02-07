/**
 * 
 */
package com.osu.capstone.project.unsecure.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.osu.capstone.project.unsecure.dto.Account;
import com.osu.capstone.project.unsecure.dto.Transactions;

/**
 * Represents an interface between the {@link Account} DTO and the underlying database table.
 * @author Zach Earl
 */

@Repository
public class AccountDAO {
	
	@Autowired
	private JdbcTemplate template;
	
	@Autowired 
	private TransactionsDAO transactionsDao;
	
	public Account getAccount(Integer customerId) {
		String query = "SELECT id, customer_id, checking_balance, credit_card_balance, " + 
						"credit_card, checking_account FROM account WHERE id = " + customerId;
		return template.queryForObject(query,(rs, rowNum) ->
		new Account(
				rs.getInt("id"),
				rs.getString("checking_account"),
				rs.getString("credit_card"),
				rs.getDouble("checking_balance"),
				rs.getDouble("credit_card_balance"),
				rs.getInt("customer_id")
			)
		);	
	}
	
	public void addAccount(Account a) {
		String query = "INSERT INTO account (customer_id, checking_balance, credit_card_balance, credit_card, checking_account) VALUES(?, ?, ?, ?, ?)";
		template.update(query, a.getCustomerId(), a.getCheckingBalance(), a.getCreditCardBalance(), a.getCreditCard(), a.getCheckingAccount());
	}
	
	public void updateAccount(Account a) {
		String query = "UPDATE account SET customer_id = ?, checking_balance = ?, credit_card_balance = ?, credit_card = ?, checking_account = ? WHERE id = ?";
		template.update(query, a.getCustomerId(), a.getCheckingBalance(), a.getCreditCardBalance(), a.getCreditCard(), a.getCheckingAccount(), a.getAccountId());

	}
	
	public void payBalance(Double amountPaid, Account a) {
		// set new balance
		a.setCreditCardBalance(a.getCreditCardBalance() - amountPaid);
		// update account to reflect new balance 
		updateAccount(a);
		Transactions creditCardPayment = new Transactions(null, a.getAccountId(), "Credit Card Payment", amountPaid);
		// add credit card payment to customer's transactions
		transactionsDao.addTransaction(creditCardPayment);
	}
}
