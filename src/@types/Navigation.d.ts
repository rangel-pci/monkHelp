export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            signup: undefined,
            home: undefined,
            register: { organization?: string | boolean},
            details: { orderId: string },
            configs: undefined,
        }
    }
}