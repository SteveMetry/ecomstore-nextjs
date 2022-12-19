export interface User {
  id: number;
  mode: string;
  username: string;
  password: string;
  phone: number;
  email: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  image: string;
  cartItems: [];
  address?: {
    line1: string;
    line2: string;
    suburb: string;
    city: string;
    postcode: string;
    message: string;
  };
  receipts?: [];
  reviews?: [];
}
