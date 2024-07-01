export interface LoginAuthResponse {
  ok: boolean;
  msg: string;
  user: User;
  token: string;
}

export interface User {
  id: number;
  nombre: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
