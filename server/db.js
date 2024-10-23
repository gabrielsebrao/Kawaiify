import Sequelize from 'sequelize'

const sequelize = new Sequelize(
    'kawaiify',
    'postgres',
    'postgres',
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres'
    }
)

const User = sequelize.define('user', {
    username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },

    birthday: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },

    gender: {
        type: Sequelize.DataTypes.ENUM('Homem', 'Mulher', 'Não Binário', 'Outro', 'Prefiro Não Dizer'),
        allowNull: false
    }
}, { freezeTableName: true })

const criarTabelas = () => {
    sequelize.authenticate().then(() => {
        console.log('Conectou!')
    }).catch((err) => {
        console.log(err)
    })

    sequelize.sync({ force: true }).then(() => {
        console.log('Tabela criada!')
    })
}

export { User, sequelize, criarTabelas }