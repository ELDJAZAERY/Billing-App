declare type LoginFormData = {
  email: string;
  password: string;
};

declare type AuthContextType = {
  login: (token: string) => void;
  logout: Function;
};
