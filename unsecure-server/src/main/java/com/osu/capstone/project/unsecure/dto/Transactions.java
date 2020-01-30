/**
 * 
 */
package com.osu.capstone.project.unsecure.dto;

/**
 * @author Zach Earl
 *
 */
public class Transactions {
	private Long transactionId;
	private Long accountId;
	private String vendorName;
	private String amountPaid;
	
	public Transactions(Long transactionId, Long accountId, String vendorName, String amountPaid) {
		this.transactionId = transactionId;
		this.accountId = accountId;
		this.vendorName = vendorName;
		this.amountPaid = amountPaid;
	}

	public Long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getAmountPaid() {
		return amountPaid;
	}

	public void setAmountPaid(String amountPaid) {
		this.amountPaid = amountPaid;
	}
}
