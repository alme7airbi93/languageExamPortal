// Enum for User Type
enum UserType {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

// User Class
export class User {
  email: string;
  name: string;
  type: UserType;

  constructor(email: string, name: string, type?: UserType) {
    this.email = email;
    this.name = name;
    this.type = type || UserType.STUDENT;
     // Prevent extensions after initializing properties
    Object.preventExtensions(this);
  }
}