/**
 * 
 */
package com.osu.capstone.project.unsecure.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.osu.capstone.project.unsecure.dao.CustomerDAO;
import com.osu.capstone.project.unsecure.dto.Customer;

/**
 * @author Zach Earl
 *
 */
@RestController
@RequestMapping("customer")
public class CustomerController {
	
	@Autowired
	private CustomerDAO dao;
	
	@GetMapping("id/{customerId}")
	public Customer getCustomer(@PathVariable Long customerId) {
		return dao.getCustomer(customerId);
	}

}
