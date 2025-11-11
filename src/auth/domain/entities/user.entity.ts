export class UserEntity {
  readonly id: string;
  username?: string | null;
  password?: string;
  email: string;
  role: string;
}
