import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('usuario', table => {
        table.uuid('id').primary()
        table.string('fist_name').notNullable()
        table.string('last_name').notNullable()
        table.string('email').notNullable()
        table.decimal('age', 3, 0).notNullable()
        table.string('created_at').defaultTo(knex.fn.now()).notNullable()
        table.string('session_id')
    })

}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('usuario')
}

