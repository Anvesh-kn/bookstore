const urlConfig = {
    api: {
        baseUrl: 'http://localhost:8081/api',
        orders: '/orders',
        product:'/products',
    },
    apiOrders:{
        baseUrl: 'http://localhost:8082/api',
        orders: '/orders',
    },

    endpoints: {
        createOrder: (limit: number, page: number) => `${urlConfig.api.baseUrl}${urlConfig.api.orders}?limit=${limit}&page=${page}`,
        getOrdersList: () => `${urlConfig.apiOrders.baseUrl}${urlConfig.apiOrders.orders}`,
        getOrdersListWithPagination: (limit: number, page: number) => `${urlConfig.api.baseUrl}${urlConfig.api.orders}?limit=${limit}&page=${page}`,
        getOrderById: (id: string) => `${urlConfig.apiOrders.baseUrl}${urlConfig.apiOrders.orders}/${id}`,
        getProducts: (limit: number, page: number) => `${urlConfig.api.baseUrl}${urlConfig.api.product}?limit=${limit}&page=${page}`,
        getProductByCode: (code: string) => `${urlConfig.api.baseUrl}${urlConfig.api.product}/${code}`,
    },
    otherSettings: {
        maxRetries: 3,
        timeout: 5000, // 5 seconds
    },
};

export default urlConfig;