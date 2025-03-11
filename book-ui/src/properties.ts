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
    apiGateway:{
        baseUrl:"http://localhost:8989",
        orders: '/orders',
        product: '/catalog',
    },
    apiGatewaySubUrl:{
        orders:'/api/orders',
        product:'/api/products',
    },
    endpoints: {
        // postOrder: () => `${urlConfig.apiOrders.baseUrl}${urlConfig.apiOrders.orders}`,
        // getOrdersList: () => `${urlConfig.apiOrders.baseUrl}${urlConfig.apiOrders.orders}`,
        getOrdersList: () => `${urlConfig.apiGateway.baseUrl}${urlConfig.apiGateway.orders}${urlConfig.apiGatewaySubUrl.orders}`,
        postOrder: () => `${urlConfig.apiGateway.baseUrl}${urlConfig.apiGateway.orders}${urlConfig.apiGatewaySubUrl.orders}`,
        // getOrdersListWithPagination: (limit: number, page: number) => `${urlConfig.api.baseUrl}${urlConfig.api.orders}?limit=${limit}&page=${page}`,
        // getOrderById: (id: string) => `${urlConfig.apiOrders.baseUrl}${urlConfig.apiOrders.orders}/${id}`,
        getOrderById: (id: string) => `${urlConfig.apiGateway.baseUrl}${urlConfig.apiGateway.orders}${urlConfig.apiGatewaySubUrl.orders}/${id}`,
        getProducts: (limit: number, page: number) => `${urlConfig.apiGateway.baseUrl}${urlConfig.apiGateway.product}${urlConfig.apiGatewaySubUrl.product}?limit=${limit}&page=${page}`,
        getProductByCode: (code: string) => `${urlConfig.api.baseUrl}${urlConfig.api.product}/${code}`,
    },
    otherSettings: {
        maxRetries: 3,
        timeout: 5000, // 5 seconds
    },
};

export default urlConfig;