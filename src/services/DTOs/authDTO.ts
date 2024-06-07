import {
  ISignUpUserInputType,
  SignupUserDTO,
  SignUpAuthDTO,
  LogInDTO,
  ILogInAuthInfoType
} from '../../interfaces/auth';
import { IRole } from '../../interfaces/user';

export class getSignupUserDTO implements SignupUserDTO {
  UserName: string;
  Email: string;
  Name: string;
  JoinDate: Date;
  Role: number;

  constructor(signUpUserInput: ISignUpUserInputType) {
    this.UserName = signUpUserInput.UserName;
    this.Email = signUpUserInput.Email;
    this.Name = signUpUserInput.Name;
    this.Role = IRole.user;
    this.JoinDate = new Date();
  }
  dataValidate() {
    if (
      this.UserName == undefined ||
      this.Email == undefined ||
      this.Name == undefined
    ) {
      throw new Error('Data missing');
    }
  }
}

export class getSignupAuthDTO implements SignUpAuthDTO {
  UserName: string;
  Password: string;

  constructor(signUpUserInput: ISignUpUserInputType) {
    this.UserName = signUpUserInput.UserName;
    this.Password = signUpUserInput.Password;
  }
  dataValidate() {
    if (this.UserName == undefined || this.Password == undefined) {
      throw new Error('Data missing');
    }
  }
}

export class getLogInDTO implements LogInDTO {
  UserName: string;
  Password: string;

  constructor(logInUserInput: ILogInAuthInfoType) {
    this.UserName = logInUserInput.UserName;
    this.Password = logInUserInput.Password;
  }
  dataValidate() {
    if (this.UserName == undefined || this.Password == undefined) {
      throw new Error('Data missing');
    }
  }
}
