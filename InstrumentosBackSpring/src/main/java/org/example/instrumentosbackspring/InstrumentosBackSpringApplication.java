package org.example.instrumentosbackspring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



@SpringBootApplication
public class InstrumentosBackSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(InstrumentosBackSpringApplication.class, args);
        System.out.println("Backend funcionando en : http://localhost:8080/");
    }


}
