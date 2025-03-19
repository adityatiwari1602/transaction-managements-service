package com.track_dime.transaction_management_service.Controller;


import com.track_dime.transaction_management_service.Service.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/transactions")
@Slf4j
public class TransactionsController {

    private static final Logger logger = LoggerFactory.getLogger(TransactionsController.class);

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCSV(@RequestParam("file")MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Nothing is there in the file");
            }
            transactionService.uploadCSV(file);
            return ResponseEntity.ok("File uploaded successfully!");
        } catch (Exception ex) {
            logger.error("Error occurred!");
            return ResponseEntity.internalServerError().body("Error uploading CSV !!!");
        }
    }
}
