module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('episodes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      synopsis: { type: Sequelize.TEXT, allowNull: false },
      order: { type: Sequelize.INTEGER, allowNull: false }, // Corrigido ✅
      video_url: { type: Sequelize.STRING },
      seconds_long: { type: Sequelize.INTEGER },
      course_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'courses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('episodes');
  }
};
