import UserService from '../services/UserService.js';

class UserController {

    static getUserById(id){
        const user = UserService.getUserById(id);
        if(!user){
            throw Error(`User with id ${id} not found`);
        }
        return user;
    }

    static getAllUsers(){
        return UserService.getAllUsers();
    }

    static createUser(userModel){
        UserService.createUser(userModel);
    }

    static updateUser(id, userModel){
        const user = UserService.updateUser(id, userModel);
        if(!user){
            throw Error(`User with id ${id} not found`);
        }

        return user;
    }

    static deleteUser(id){
        const user = UserService.deleteUser(id);
        if(!user){
            throw Error(`User with id ${id} not found`);
        }
        return user;
    }
}

export default  UserController;