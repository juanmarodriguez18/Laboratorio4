package org.example.instrumentosbackspring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
public class InstrumentosBackSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(InstrumentosBackSpringApplication.class, args);
        System.out.println("Backend funcionando...");
    }


}
