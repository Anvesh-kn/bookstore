package org.shopping.catalogservice.domain;



import org.springframework.data.jpa.repository.JpaRepository;

interface ProductRepository extends JpaRepository<ProductEntity, Long> {

}
