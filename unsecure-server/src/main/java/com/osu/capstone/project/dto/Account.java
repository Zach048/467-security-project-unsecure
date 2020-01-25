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
public class Account {
	private @Getter @Setter Long accountId;
	private @Getter @Setter String checkingAccount;
	private @Getter @Setter String creditCard;
	private @Getter @Setter String balance;
	private @Getter @Setter Long customerId;
}
