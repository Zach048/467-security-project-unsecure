/**
 * 
 */
package com.osu.capstone.project.unsecure.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.osu.capstone.project.unsecure.dto.Account;
import com.osu.capstone.project.unsecure.dto.Customer;

/**
 * @author Zach Earl
 *
 */
//@Repository
//public class AccountDAO {
//	@Autowired
//	private JdbcTemplate template;
//	public Account getAccount(Long id) {
//		String query = "";
//		return template.queryForObject(query,(rs, rowNum) ->
//		new Account(
//				rs.getLong(""),
//				rs.getString(""),
//				rs.getString(""),
//				rs.getString(""),
//				rs.getString("")
//			)
//		);	
//	}
//	
//	public String payBalance(int amountPaid) {
//		String query = "";
//		return (String) template.queryForObject(query,(rs, rowNum) -> (rs.getString(""))
//		);	
//	}
//}
