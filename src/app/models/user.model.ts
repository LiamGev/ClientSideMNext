export interface UserModel {
  id: string;
  name: string;
  username: string;
  email: string;
  isActive: boolean;
}

export class User implements UserModel {
  id: string;
  name: string;
  username: string;
  email: string;
  isActive: boolean;

  constructor(
    id: string,
    name: string,
    username: string,
    email: string,
    isActive: boolean
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.isActive = isActive;
  }
}
