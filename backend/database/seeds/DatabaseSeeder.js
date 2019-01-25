'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const User = use('App/Models/User')

class DatabaseSeeder {
  async run () {
    const user = await User.create({
      name: 'Mauricio Lucas',
      email: 'mauricio.nq@hotmail.com',
      password: '123'
    })

    const team = await user.teams().create({
      name: 'RocketDev',
      user_id: user.id,
    })
  }
}

module.exports = DatabaseSeeder
