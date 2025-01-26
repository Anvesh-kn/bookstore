package org.shopping.catalogservice.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "products")
class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_seq")
    @SequenceGenerator(name = "product_seq", sequenceName = "product_id_seq", allocationSize = 50)
    private long id;

    @NotEmpty(message = "Product Name is required")
    private String name;

    @Column(nullable = false, unique = true)
    @NotEmpty(message = "Product Code is required")
    private String code;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @NotNull(message = "Product Price is required") @Column(nullable = false)
    private BigDecimal price;
}
