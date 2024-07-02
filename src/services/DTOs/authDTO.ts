import {
  ISignUpUserInputType,
  ISignUpUserDTO,
  ISignUpAuthDTO,
  ILogInDTO,
  ILogInAuthInputType
} from '../../interfaces/auth';
import { Role } from '../../enums/roles';

export class SignUpUserDTO implements ISignUpUserDTO {
  UserName: string;
  Email: string;
  Name: string;
  JoinDate: Date;
  Role: number;

  constructor(signUpUserInput: ISignUpUserInputType) {
    this.UserName = signUpUserInput.UserName;
    this.Email = signUpUserInput.Email;
    this.Name = signUpUserInput.Name;
    this.Role = Role.user;
    this.JoinDate = new Date();
  }
}

export class SignUpAuthDTO implements ISignUpAuthDTO {
  UserName: string;
  Password: string;
  PasswordModifiedAt: Date;

  constructor(signUpUserInput: ISignUpUserInputType) {
    this.UserName = signUpUserInput.UserName;
    this.Password = signUpUserInput.Password;
    this.PasswordModifiedAt = new Date();
  }
}

export class LogInDTO implements ILogInDTO {
  UserName: string;
  Password: string;

  constructor(logInUserInput: ILogInAuthInputType) {
    this.UserName = logInUserInput.UserName;
    this.Password = logInUserInput.Password;
  }
}
