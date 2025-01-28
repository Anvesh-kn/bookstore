package org.shopping.catalogservice.domain;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.testcontainers.utility.TestcontainersConfiguration;

@DataJpaTest(
        properties = {
            "spring.test.database.replace=NONE",
            //             "spring.datasource.url=jdbc:tc:postgresql:16-alpine:///db"
        })
@Import(TestcontainersConfiguration.class)
@RunWith(SpringRunner.class)
@Sql("/test_data.sql")
public class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    @Test
    public void testRepositoryInitialization() {

        assertThat(productRepository).isNotNull();
        System.out.println("passed2");
    }

    @Test
    public void testProductRepository() {
        List<ProductEntity> products = this.productRepository.findAll();
        System.out.println("passed");
        assertThat(products).hasSize(15);
    }
}
