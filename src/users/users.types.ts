export class CreateUsersDto {
  id?: string;
  login: string;
  password: string;
}

export class ReturnUsers {
  id: string;
  login: string;
  password: string;
}
