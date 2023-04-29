export type User = {
  id: number;
  name: string;
  email: string;
  salary: string;
  expenses: string;
  account?: Account;
};

export type NewUser = {
  name?: string;
  email?: string;
  salary?: string;
  expenses?: string;
};

export type Account = {
  id: number;
  userId: number;
};

export type FormInputs = {
  name?: string;
  email?: string;
  salary?: string;
  expenses?: string;
  userId?: string;
};
