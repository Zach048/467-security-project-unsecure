/**
 * 
 */
package com.osu.capstone.project.unsecure.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.osu.capstone.project.unsecure.dto.Customer;

/**
 * @author Zach Earl
 *
 */
@Repository
public class CustomerDAO {
	@Autowired
	private JdbcTemplate template;
	
	public Customer getCustomer(Long id) {
		String query = "SELECT ID, First_Name, Last_Name, Username, Password, Email, Phone FROM Customer WHERE ID = " + id;
		return template.queryForObject(query,(rs, rowNum) ->
		new Customer(
				rs.getLong("ID"),
				rs.getString("Username"),
				rs.getString("Password"),
				rs.getString("First_Name"),
				rs.getString("Last_name"),
				rs.getString("Email"),
				rs.getString("Phone")
			)
		);	
	}
}
