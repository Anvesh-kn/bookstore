package org.shopping.orderservice.catalog;

import org.shopping.orderservice.domain.ApplicationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

@Configuration
class CatalogClientConfiguration {

    @Bean
    RestClient catalogClient(ApplicationProperties properties) {
        System.out.println("properties.serviceCatalogService() = " + properties.serviceCatalogService());
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setReadTimeout(5000);
        factory.setConnectTimeout(5000);
        return RestClient.builder()
                .baseUrl(properties.serviceCatalogService())
                .requestFactory(factory)
                .build();
    }
}
