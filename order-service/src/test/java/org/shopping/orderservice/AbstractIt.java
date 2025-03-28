package org.shopping.orderservice;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

import com.github.tomakehurst.wiremock.client.WireMock;
import io.restassured.RestAssured;
import java.math.BigDecimal;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.wiremock.integrations.testcontainers.WireMockContainer;

@Import(TestcontainersConfiguration.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public abstract class AbstractIt {
    @LocalServerPort
    int port;

    public static WireMockContainer wireMockContainer = new WireMockContainer("wiremock/wiremock:3.5.2-alpine");

    @BeforeAll
    static void beforeAll() {
        wireMockContainer.start();
        System.out.println("WireMock container started at: " + wireMockContainer.getBaseUrl());
        configureFor(wireMockContainer.getHost(), wireMockContainer.getPort());
    }

    @DynamicPropertySource
    static void configureWireMock(DynamicPropertyRegistry registry) {
        registry.add("orders.catalog-service-url", () -> wireMockContainer.getBaseUrl());
    }

    protected static void mockGetProductByCode(String code, String name, BigDecimal price) {
        stubFor(WireMock.get(urlEqualTo("/api/products/" + code))
                .willReturn(aResponse()
                        .withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                        .withStatus(200)
                        .withBody(
                                """
                                        {
                                            "code": "%s",
                                            "name": "%s",
                                            "price": %f
                                        }
                                    """
                                        .formatted(code, name, price.doubleValue()))));
        System.out.println("WireMock URL: " + wireMockContainer.getBaseUrl());
    }

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }
}
