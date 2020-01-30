/**
 * 
 */
package com.osu.capstone.project.unsecure.dto;

/**
 * @author Zach Earl
 *
 */
public class Account {
	private Long accountId;
	private String checkingAccount;
	private String creditCard;
	private String balance;
	private Long customerId;
	
	public Account(Long accountId, String checkingAccount, String creditCard, String balance, Long customerId) {
		this.accountId = accountId;
		this.checkingAccount = checkingAccount;
		this.creditCard = creditCard;
		this.balance = balance;
		this.customerId = customerId;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getCheckingAccount() {
		return checkingAccount;
	}

	public void setCheckingAccount(String checkingAccount) {
		this.checkingAccount = checkingAccount;
	}

	public String getCreditCard() {
		return creditCard;
	}

	public void setCreditCard(String creditCard) {
		this.creditCard = creditCard;
	}

	public String getBalance() {
		return balance;
	}

	public void setBalance(String balance) {
		this.balance = balance;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}
}
