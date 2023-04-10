import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function usuariosRoutes( app: FastifyInstance ){

    app.delete('/:id', async (request, reply) => {
        const getIdParamSchema = z.object({
            id: z.string().uuid()
        })
            
        const { id } = getIdParamSchema.parse(request.params)

        await knex('usuario').where({ id }).del()

        return reply.status(202).send({
            message: 'Usuário deletado com sucesso.'
        })
    
    })

    app.post('/', async (request, reply) => {

        const createUsuario = z.object({
            fist_name: z.string(),
            last_name: z.string(),
            email: z.string(),
            age: z.number()
        })

        const { fist_name, last_name, email, age } = createUsuario.parse(request.body)

        const usuarioID = await knex('usuario').insert({
            id: randomUUID(),
            fist_name,
            last_name,
            email,
            age,
        }).returning('id')

        return reply.status(201).send({
            message: 'Usuário criado com sucesso - ',
            id: usuarioID[0].id,
        })

    })

}