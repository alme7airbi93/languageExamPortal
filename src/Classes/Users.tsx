// Enum for User Type
export enum UserType {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

// User Class
export class User {
  email: string;
  name: string;
  type: UserType;
  id!: string;
 

  constructor(email: string, name: string, type: UserType) {
    this.id 
    this.email = email;
    this.name = name;
    this.type = type || UserType.STUDENT;
     // Prevent extensions after initializing properties
    Object.preventExtensions(this);
  }
}

export interface UserInterface {
   email: string;
  name: string;
  type: UserType;
  id: string;
}