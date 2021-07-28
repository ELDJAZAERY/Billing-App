declare type LoginFormData = {
  email: string;
  password: string;
};

declare type AuthContextType = {
  login: Function;
  logout: Function;
};
