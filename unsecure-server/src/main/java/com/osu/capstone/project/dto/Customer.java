/**
 * 
 */
package com.osu.capstone.project.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * @author Zach Earl
 *
 */
public class Customer {
	private @Getter @Setter Long customerId;
	private @Getter @Setter String userName;
	private @Getter @Setter String password;
	private @Getter @Setter String firstName;
	private @Getter @Setter String lastName;
	private @Getter @Setter String email;
	private @Getter @Setter String phone;
}
