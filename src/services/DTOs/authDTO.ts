import {
  ISignUpUserInputType,
  ISignUpUserDTO,
  ISignUpAuthDTO,
  ILogInDTO,
  ILogInAuthInfoType
} from '../../interfaces/auth';
import { Role } from '../../interfaces/user';
import { AppError } from '../../utils/appError';

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
  dataValidate() {
    if (
      this.UserName == undefined ||
      this.Email == undefined ||
      this.Name == undefined
    ) {
      throw new AppError(400, 'Data missing');
    }
  }
}

export class SignUpAuthDTO implements ISignUpAuthDTO {
  UserName: string;
  Password: string;

  constructor(signUpUserInput: ISignUpUserInputType) {
    this.UserName = signUpUserInput.UserName;
    this.Password = signUpUserInput.Password;
  }
  dataValidate() {
    if (this.UserName == undefined || this.Password == undefined) {
      throw new AppError(400, 'Data missing');
    }
  }
}

export class LogInDTO implements ILogInDTO {
  UserName: string;
  Password: string;

  constructor(logInUserInput: ILogInAuthInfoType) {
    this.UserName = logInUserInput.UserName;
    this.Password = logInUserInput.Password;
  }
  dataValidate() {
    if (this.UserName == undefined || this.Password == undefined) {
      throw new AppError(400, 'Data missing');
    }
  }
}
