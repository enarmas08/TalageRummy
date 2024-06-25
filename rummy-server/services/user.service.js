const User = require('../models/user.model');

class UserService {
  async createUser(userData) {
    const user = await User.create(userData);
    return user;
  }

  async findUserById(userId) {
    const user = await User.findByPk(userId);
    return user;
  }

  async findUserByUsername(username) {
      return await User.findOne({ where: { userName: username } });
  }

  // Autres méthodes pour gérer les utilisateurs...
}

module.exports = new UserService();
