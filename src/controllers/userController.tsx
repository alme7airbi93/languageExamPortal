import UserRepository from '../repositories/user-repository';
import { UserInterface } from '../Classes/Users';

class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async addUser(user: UserInterface): Promise<UserInterface> {
    try {

      // Call the repository to add the user
      const newUser = await this.userRepository.addUser(user);

      return newUser;
    } catch (error) {
      console.error('Error adding user: ', error);
      throw error;
    }
  }

  async getUsers(): Promise<UserInterface[]> {
    try {

      // Call the repository to get users
      const users = await this.userRepository.getUsers();

      return users;
    } catch (error) {
      console.error('Error getting users: ', error);
      return [];
    }
  }

  async getUsersByStudentIDs(userIds: string[]): Promise<UserInterface[]> {
    try {
      const users = await this.userRepository.getUsersByStudentIDs(userIds);
      return users;
    } catch (error) {
      console.error('Error getting users: ', error);
      return [];
    }
  }

  async getSingleUser(userId: string): Promise<UserInterface | null> {
    try {
      const user = await this.userRepository.getUser(userId);
      return user;
    } catch (error) {
      console.error('Error getting users: ', error);
      return null;
    }
  }

  async updateUser(user: UserInterface): Promise<void> {
    try {


      // Call the repository to update the user
      await this.userRepository.updateUser(user);

      
    } catch (error) {
      console.error('Error updating user: ', error);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
    

      // Call the repository to delete the user
      await this.userRepository.deleteUser(userId);

     
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  }
}

export default UserController;
