export type FindUserParams = Partial<{
  id: number;
  email: string;
}>;

export type CreateUserDetails = Partial<{
  email: string;
  name: string;
  gender: string;
}>;
