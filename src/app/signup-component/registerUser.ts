export class RegisterUser {
  constructor(
    public email: string,
    public password: string,
    public confirmPassword: string,
    public month: string,
    public day: string,
    public year: string,
    public profile: string 
  ) {  }
}
