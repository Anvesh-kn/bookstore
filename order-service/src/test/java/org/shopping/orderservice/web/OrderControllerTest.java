package org.shopping.orderservice.web;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.notNullValue;

import io.restassured.http.ContentType;
import java.math.BigDecimal;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.shopping.orderservice.AbstractIt;
import org.shopping.orderservice.testdata.TestDataFactory;
import org.springframework.http.HttpStatus;

class OrderControllerTest extends AbstractIt {

    @Nested
    class CreateOrderTests {
        @Test
        void shouldCreateOrderSuccessfully() {
            mockGetProductByCode("P100", "Product 1", BigDecimal.valueOf(25.50));
            var payload =
                    """
                                {
                                    "customer" : {
                                        "name": "Siva",
                                        "email": "siva@gmail.com",
                                        "phone": "999999999"
                                    },
                                    "deliveryAddress" : {
                                        "addressLine1": "HNO 123",
                                        "addressLine2": "Kukatpally",
                                        "city": "Hyderabad",
                                        "state": "Telangana",
                                        "zipCode": "500072",
                                        "country": "India"
                                    },
                                    "items": [
                                        {
                                            "code": "P100",
                                            "name": "Product 1",
                                            "price": 25.50,
                                            "quantity": 1
                                        }
                                    ]
                                }
                            """;
            given().contentType(ContentType.JSON)
                    .body(payload)
                    .when()
                    .post("/api/orders")
                    .then()
                    .statusCode(HttpStatus.CREATED.value())
                    .body("orderNumber", notNullValue());
        }

        @Test
        void shouldReturnBadRequestWhenMandatoryDataIsMissing() {
            var payload = TestDataFactory.createOrderRequestWithInvalidCustomer();
            given().contentType(ContentType.JSON)
                    .body(payload)
                    .when()
                    .post("/api/orders")
                    .then()
                    .statusCode(HttpStatus.BAD_REQUEST.value());
        }
    }
}
