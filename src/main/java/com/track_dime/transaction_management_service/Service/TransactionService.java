package com.track_dime.transaction_management_service.Service;

import com.opencsv.CSVReader;
import com.track_dime.transaction_management_service.Repository.TransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.track_dime.transaction_management_service.Entities.Transaction;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class TransactionService {

    private static final Logger logger = LoggerFactory.getLogger(TransactionService.class);

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    @Autowired
    TransactionRepository transactionRepository;

    public void uploadCSV(MultipartFile file) throws Exception {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
             CSVReader csvReader = new CSVReader(reader)) {

            String[] headers = csvReader.readNext(); // Read header row
            String[] line;
            List<Transaction> transactions = new ArrayList<>();

            while ((line = csvReader.readNext()) != null) {
                Transaction transaction = new Transaction();
                transaction.setTransactionDate(LocalDate.parse(line[0], DATE_FORMATTER));
                transaction.setChequeNumber(line[1]);
                transaction.setParticulars(line[2]);

                Double debit = line[3].isEmpty() ? 0.0 : Double.parseDouble(line[3]);
                Double credit = line[4].isEmpty() ? 0.0 : Double.parseDouble(line[4]);

                if (debit > 0) {
                    transaction.setTransactionType("DR");
                    transaction.setAmount(debit);
                } else {
                    transaction.setTransactionType("CR");
                    transaction.setAmount(credit);
                }

                transaction.setBalance(Double.parseDouble(line[5]));

                transactions.add(transaction);
            }
            transactionRepository.saveAll(transactions);
        } catch (Exception ex) {
            logger.error("Error occurred uploading file to DB, {}", ex.getLocalizedMessage());
            throw new Exception("Error occurred uploading file to DB" + ex.getLocalizedMessage());
        }

    }

}
