import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function refeicaoRoutes( app: FastifyInstance ){

    const typeSchemaRefeicao = z.object({
        nome: z.string(),
        descricao: z.string(),
        diet: z.boolean(),
        created_at: z.string().datetime( { offset: true } )
    })

    app.post('/', async (request, reply) => {

        const { nome, descricao, diet, created_at } = typeSchemaRefeicao.parse(request.body)
        const { sessionId } = request.cookies

        const { id } = await knex('usuario').where({ session_id: sessionId }).first() as { id: string }

        await knex('refeicoes').insert({
            id: randomUUID(),
            nome,
            descricao,
            diet,
            created_at,
            usuario_id: id
        })

        return reply.status(201).send({
            message: 'Refeição criada com sucesso.'
        })

    })

    app.get('/', async (request, reply) => {

        const { sessionId } = request.cookies

        const { id } = await knex('usuario').where({ session_id: sessionId }).first() as { id: string }

        const refeicoes = await knex('refeicoes').where({ usuario_id: id })

        return reply.status(200).send(refeicoes)

    })

    app.get('/:id', async (request, reply) => {
            
            const getIdParamSchema = z.object({
                id: z.string().uuid()
            })
    
            const { id } = getIdParamSchema.parse(request.params)
    
            const refeicao = await knex('refeicoes').where({ id }).first()
    
            return reply.status(200).send(refeicao)
    
    })

    app.put('/:id', async (request, reply) => {

        const getIdParamSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getIdParamSchema.parse(request.params)

        const { nome, descricao, diet, created_at } = typeSchemaRefeicao.parse(request.body)

        await knex('refeicoes').where({ id }).update({
            nome,
            descricao,
            diet,
            created_at
        })

        return reply.status(202).send({
            message: 'Refeição atualizada com sucesso.'
        })

    })

    app.delete('/clean', async (request, reply) => {
        await knex('refeicoes').del()
        return reply.status(202).send({
            message: 'Refeições deletadas com sucesso.'
        })
    })

    app.delete('/:id', async (request, reply) => {
        const getIdParamSchema = z.object({
            id: z.string().uuid()
        })
            
        const { id } = getIdParamSchema.parse(request.params)

        await knex('refeicoes').where({ id }).del()

        return reply.status(202).send({
            message: 'Refeição deletada com sucesso.'
        })
    })

}