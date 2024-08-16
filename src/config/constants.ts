export const UserPerPage: number = 3;
export const StoryPerPage: number = 12;
export const UserNameMinLength: number = 1;
export const UserNameMaxLength: number = 20;
export const NameMinLength: number = 1;
export const NameMaxLength: number = 30;
export const NamePattern: RegExp = /^[a-zA-Z.\s]*$/;
export const PasswordPattern: RegExp =
  /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\W_]{8,}$/;
export const StoryTitleMinLength: number = 1;
export const StoryTitleMaxLength: number = 100;
export const StoryDescriptionMinLength: number = 10;
