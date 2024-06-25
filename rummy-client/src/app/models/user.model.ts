

export class User {
  public id!: number;
  public username: string = '';
  public email: string = '';
  public password: string = '';

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
} 
