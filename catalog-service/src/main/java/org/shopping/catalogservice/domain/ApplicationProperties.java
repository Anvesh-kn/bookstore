package org.shopping.catalogservice.domain;

import jakarta.validation.constraints.Min;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;

@ConfigurationProperties(prefix = "catalog-service")
public record ApplicationProperties(@DefaultValue("5") @Min(1) int pageSize) {
}
