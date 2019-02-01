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
const Role = use('Adonis/Acl/Role')
const Permission = use('Adonis/Acl/Permission')

class DatabaseSeeder {
  async run () {
    const user = await User.create({
      name: 'Mauricio Lucas',
      email: 'mauricio.nq@hotmail.com',
      password: '123'
    })

    const createInvite = await Permission.create({
      slug: 'invites_create',
      name: 'Convidar membros'
    })

    const createProject = await Permission.create({
      slug: 'projects_create',
      name: 'Criar Projectos'
    })

    const admin = await Role.create({
      slug: 'administrator',
      name: 'Administrador'
    })

    const moderador = await Role.create({
      slug: 'moderator',
      name: 'Moderador'
    })

    await Role.create({
      slug: 'visitor',
      name: 'Visitante'
    })

    await admin.permissions().attach([
      createInvite.id,
      createProject.id
    ])

    await moderador.permissions().attach([
      createProject.id
    ])



    const team = await user.teams().create({
      name: 'RocketDev',
      user_id: user.id,
    })

    const teamJoin = await user.teamJoin()
      .where('team_id', team.id)
      .first()

    await teamJoin.roles()
      .attach([
        admin.id
      ])
  }
}

module.exports = DatabaseSeeder
