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
public class Transactions {
	private @Getter @Setter Long transactionId;
	private @Getter @Setter Long accountId;
	private @Getter @Setter String vendorName;
	private @Getter @Setter String amountPaid;
}
