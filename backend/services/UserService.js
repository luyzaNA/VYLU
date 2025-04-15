const users = [
    {nume: 'Luyza', varsta: 23, id: "1"},
    {nume: 'Madalin', varsta: 25, id: "2"},
];

class UserService {

    static getUserById(userId) {
        return users.find(user => user.id === userId);
    }

    static getAllUsers() {
        return users;
    }

    static createUser(userModel) {
        users.push(userModel);
    }

    static updateUser(userId, userModel) {
        const index = users.findIndex(user => user.id === userId);
        if (index === -1) {
            return null;
        }
        users[index] = { ...users[index], ...userModel };
        return users[index];
    }

    static deleteUser(userId) {
        const index = users.findIndex(user => user.id === userId);
        if (index === -1) {
            return null;
        }
        const deletedUser = users.splice(index, 1);
        return deletedUser[0];
    }
}

export default UserService;