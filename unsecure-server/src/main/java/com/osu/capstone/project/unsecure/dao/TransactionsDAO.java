/**
 * 
 */
package com.osu.capstone.project.unsecure.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.osu.capstone.project.unsecure.dto.Account;
import com.osu.capstone.project.unsecure.dto.Transactions;

/**
 * @author Zach Earl
 *
 */
//@Repository
//public class TransactionsDAO {
//	@Autowired
//	private JdbcTemplate template;
//	public List<Transactions> getTransactions(Long id) {
//		String query = "";
//		return template.query(query,(rs, rowNum) ->
//		new Transactions(
//				rs.getLong(columnIndex),
//				rs.getString(""),
//				rs.getString(""),
//				rs.getString("")
//			)
//		);	
//	}
//}
