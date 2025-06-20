// src/database/index.ts

import { Sequelize } from 'sequelize'
import { DATABASE_URL } from '../config/environment'

export const database = new Sequelize(DATABASE_URL,{
	define: {
    underscored: true
  }
})

