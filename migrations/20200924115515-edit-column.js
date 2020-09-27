'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('Users', 'role'), 
    queryInterface.addColumn(
      'Todos', // name of Source model
      'user_id', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ),
    queryInterface.addColumn(
      'Users', // name of Source model
      'email', // name of the key we're adding 
      {
        type: Sequelize.STRING,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    )
  ])



  },

  down: (queryInterface, Sequelize) => {
    
  }
};
