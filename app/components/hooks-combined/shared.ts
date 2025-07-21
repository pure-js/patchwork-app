type ID = string | number;

interface User {
  id: ID;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface Product {
  id: ID;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

interface Order {
  id: ID;
  userId: ID;
  productIds: ID[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
}

// Utility-typed variations for specific app contexts
type PartialUser = Partial<User>; // Allows creating or updating users with partial data
type ReadonlyProduct = Readonly<Product>; // Products are immutable
type CreateOrder = Omit<Order, 'id'>; // When creating an order, the ID will be auto-generated
type UpdateProduct = Pick<Product, 'id' | 'stock'>; // Updating the stock requires only ID and stock
type AdminUser = Required<Omit<User, 'isAdmin'>>; // Admin users must have all properties, excluding isAdmin

// Complex record types for managing data
type ProductInventory = Record<ID, Product>; // A lookup table for products by their ID
type OrderHistory = Record<ID, Order>; // A lookup table for orders by their ID

// Main application state interfaces
interface AppState {
  currentUser: User | null; // The currently logged in user
  products: ProductInventory; // A dictionary of all products
  orderHistory: OrderHistory; // A dictionary of all past orders by their ID
  cart: { [productId: ID]: number }; // Product ID => quantity for items in the cart
}

// Example of comprehensive order details for front-end use
type OrderDetails = Omit<Order, 'productIds'> & {
  products: Array<Pick<Product, 'id' | 'name' | 'price'>>; // Include selected product details
};
