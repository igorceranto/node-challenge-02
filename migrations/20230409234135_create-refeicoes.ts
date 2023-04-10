import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('refeicoes', table => {
        table.uuid('id').primary()
        table.string('nome').notNullable()
        table.string('descricao').notNullable()
        table.string('created_at').defaultTo(knex.fn.now()).notNullable()
        table.boolean('diet').defaultTo(false).notNullable()
        table.uuid('usuario_id').notNullable()
        table.foreign('usuario_id').references('id').inTable('usuario')
    })

}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTable('refeicoes')

}

