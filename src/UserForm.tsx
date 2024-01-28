// UserForm.tsx

import React, { useState } from 'react';
import { User, UserType } from './Classes/Users';

interface UserFormProps {
  onAddUser: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState(UserType.STUDENT);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

//     // Create a new user instance
//     const newUser = new User(email, name, userType);
// console.log("newUser",newUser);

//     // Callback to the parent component to add the new user
//     onAddUser(newUser);

    // Reset form fields
    setEmail('');
    setName('');
    setUserType(UserType.STUDENT);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>

      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>

      <label>
        User Type:
        <select value={userType} onChange={(e) => setUserType(e.target.value as UserType)}>
          <option value={UserType.STUDENT}>Student</option>
          <option value={UserType.TEACHER}>Teacher</option>
        </select>
      </label>

      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
