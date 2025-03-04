const { JsonWebTokenError } = require("jsonwebtoken")
const Journal = require("./../models/Journal")
const User = require("./../models/User")

const faker = require("@faker-js/faker").fakerEN_US
const FactoryBot = require("factory-bot")
const Character = require("../models/Character")

require("dotenv").config()

const testUserPassword = faker.internet.password()
const factory = FactoryBot.factory
const factoryAdapter = new FactoryBot.MongooseAdapter()

factory.setAdapter(factoryAdapter)

factory.define("character", Character, {
    title: () => faker.lorem.words(),
    entry: () => faker.lorem.paragraph()
})

factory.define("user", User, {
    firstname: () => faker.person.firstName(),
    lastname: () => faker.person.lastName(),
    username: () => faker.internet.displayName(),
    email: () => faker.internet.email(),
    password: () => faker.internet.password()
})

const seed_db = async () => {
    let testUser = null

    try {
        const mongoURL = process.env.MONGO_URI_TEST;

        await Character.deleteMany({})
        await User.deleteMany({})

        testUser = await factory.create("user", { password: testUserPassword})

        await factory.createMany("character", 20, { createdBy: testUser._id})
    } catch (error) {
        console.log("database error")
        console.log(error.message)
        throw e
    }

    return testUser
}

module.exports = { testUserPassword, factory, seed_db}