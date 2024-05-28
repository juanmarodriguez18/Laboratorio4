package org.example.instrumentosbackspring.config;

import org.springframework.context.annotation.Configuration;
import org.example.instrumentosbackspring.validations.UserValidation;
import org.springframework.context.annotation.Bean;

@Configuration
public class ValidationsConfig {

    @Bean
    public UserValidation userValidation(){
        return new UserValidation();
    }
}
