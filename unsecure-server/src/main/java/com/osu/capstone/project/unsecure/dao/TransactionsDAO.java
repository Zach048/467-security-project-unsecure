/**
 * 
 */
package com.osu.capstone.project.unsecure.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.osu.capstone.project.unsecure.dto.Transactions;

/**
 * Represents an interface between the {@link Transactions} DTO and the underlying database table.
 * @author Zach Earl
 */
@Repository
public class TransactionsDAO {
	
	@Autowired
	private JdbcTemplate template;
	
	public List<Transactions> getTransactions(Integer accountId) {
		String query = "SELECT id, account_id, vendor_name, amount_paid FROM transactions WHERE account_id = " + accountId;
		return template.query(query,(rs, rowNum) ->
		new Transactions(
				rs.getInt("id"),
				rs.getInt("account_id"),
				rs.getString("vendor_name"),
				rs.getDouble("amount_paid")
			)
		);	
	}
	
	public void addTransaction(Transactions t) {
		String query = "INSERT INTO transactions (account_id, vendor_name, amount_paid) VALUES(?, ?, ?)";
		template.update(query, t.getAccountId(), t.getVendorName(), t.getAmountPaid());
	}
	
	public void updateTransaction(Transactions t) {
		String query = "UPDATE transactions SET account_id = ?, vendor_name = ?, amount_paid = ? WHERE id = ?";
		template.update(query, t.getAccountId(), t.getVendorName(), t.getAmountPaid(), t.getTransactionId());

	}
}
