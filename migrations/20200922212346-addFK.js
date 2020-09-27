'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'TodoUsers', // name of Source model
      'todo_id', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Todos', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'TodoUsers', // name of Source model
      'todo_id' // key we want to remove
    );
  }
};
