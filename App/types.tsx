declare type AuthContextType = {
  login: (token: string) => void;
  logout: Function;
};

declare type LoginFormData = {
  email: string;
  password: string;
};

declare type Product = {
  productLabel: string;
  quantity: number;
  price: number;
};

/** same as Product  */
declare type BillingDataForm = Product;

declare type ProductListCardPropsType = {
  product: Product;
  navigate?: Function;
};
