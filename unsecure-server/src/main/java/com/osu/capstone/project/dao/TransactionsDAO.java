/**
 * 
 */
package com.osu.capstone.project.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * @author Zach Earl
 *
 */
@Repository
public class TransactionsDAO {
	@Autowired
	private JdbcTemplate template;

}
