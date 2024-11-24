export interface User {
    id: number;
    name: string;
    email: string;
    // email_verified_at?: string;
    permissions: string[];
    roles: string[];
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>,> = T & {
    auth: {
        user: User;
    };
};

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
    price: number;
}

export interface Cart {
    id: number;
    user_id?: number;
    session_id?: string;
    items: CartItem[];
    total: number;
    // Add other cart fields as needed
}

export interface OrderItem {
    id: number;
    product: Product;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    user_id: number;
    subtotal: number;
    tax: number;
    total: number;
    payment_status: string;
    order_status: string;
    shipping_address: string;
    created_at: string;
    updated_at: string;
    items: OrderItem[];
}

export interface Product {
    id: number;
    name: string;
    price: number;
}

interface ProductInfo {
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
    created_at: string;
    createdBy: string;
}

//order status enum
export enum OrderStatus {
    Processing = 'processing',
    Shipped = 'shipped',
    Delivered = 'delivered',
}

