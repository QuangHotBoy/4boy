package com.poly.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MailInfor {
	String from;
	String to;
	String[] cc;
	String[] bcc;
	String subject;
	String body;
	String[] attachments;

	public MailInfor(String to, String subject, String body) {
		this.from ="nguyenminhquang220503@gmail.com";
		this.to = to; // Appending "@gmail.com" to the provided 'to' address
		this.subject = subject;
		this.body = body;
	}
}
