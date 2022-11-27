import { Sequelize } from 'sequelize'
import { migrator } from './migrator'

const sequelize = new Sequelize({
    dialect: "sqlite",
    host: ":memory:",

})

migrator(sequelize).runAsCLI()