
import { useState, Key } from "react";
import { User,UserType } from "./Classes/Users"
import UserForm from "./UserForm"

const App : React.FC = () => {
 const [users, setUsers] = useState<User[]>([]);

  const handleAddUser = (user: User) => {
    // Update the users state with the new user
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user: { name: string; email: string; type: UserType }, index: Key ) => (
          <li key={index}>
            {user.name} - {user.email} - {user.type}
          </li>
        ))}
      </ul>

      <h2>Add New User</h2>
      <UserForm onAddUser={handleAddUser} />
    </div>
  );
};


export default App
