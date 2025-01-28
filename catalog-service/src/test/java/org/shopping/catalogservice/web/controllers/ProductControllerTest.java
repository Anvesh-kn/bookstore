package org.shopping.catalogservice.web.controllers;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;
import org.shopping.catalogservice.AbstractTest;
import org.springframework.test.context.jdbc.Sql;

@Sql("/test_data.sql")
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

    @Test
    void shouldReturnProduct() {
        given().contentType(ContentType.JSON)
                .when()
                .get("/api/products/P100")
                .then()
                .statusCode(200)
                .body("code", is("P100"))
                .body("name", is("The Hunger Games"))
                .body("description", is("Winning will make you famous. Losing means certain death..."))
                .body("price", is(34.0F));
    }

    @Test
    void shouldReturnProductNotFound() {
        given().contentType(ContentType.JSON)
                .when()
                .get("/api/products/p999")
                .then()
                .statusCode(404)
                .body("title", is("Product Not Found"))
                .body("status", is(404))
                .body("detail", is("Product with code p999 not found"));
    }
}
