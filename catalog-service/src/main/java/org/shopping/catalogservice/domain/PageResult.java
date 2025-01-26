package org.shopping.catalogservice.domain;

import java.util.List;

public record PageResult<T>(
        int pageNumber,
        Long totalItems,
        boolean isFirst,
        boolean isLast,
        int totalPages,
        boolean hasNext,
        boolean hasPrevious,
        List<T> data) {}
