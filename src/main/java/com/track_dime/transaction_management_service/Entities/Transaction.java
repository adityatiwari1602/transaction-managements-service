package com.track_dime.transaction_management_service.Entities;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDate;


@Data
@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public LocalDate transactionDate;
    public String chequeNumber;
    public String particulars;

    public Double amount;
    public String transactionType; // "DR" for Debit, "CR" for Credit

    public Double balance;

    // Constructors, Getters, and Setters
}
