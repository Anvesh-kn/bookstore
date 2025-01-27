package org.shopping.catalogservice.web.controllers;

import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;
import org.shopping.catalogservice.AbstractTest;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;


class ProductControllerTest extends AbstractTest {

    @Test
    void shouldReturnProducts() {
        given().contentType(ContentType.JSON)
                .when()
                .get("/api/products")
                .then()
                .statusCode(200)
                .body("data", hasSize(5))
                .body("totalItems", is(15))
                .body("pageNumber", is(1))
                .body("totalPages", is(3))
                .body("isFirst", is(true))
                .body("isLast", is(false))
                .body("hasNext", is(true))
                .body("hasPrevious", is(false));
    }
}