import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function usuariosRoutes( app: FastifyInstance ){

    // - tipagem do schema usuario para o zod

    const typeSchemaUsuario = z.object({
        fist_name: z.string(),
        last_name: z.string(),
        email: z.string(),
        age: z.number()
    })

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

        const { fist_name, last_name, email, age } = typeSchemaUsuario.parse(request.body)

        let session_id = request.cookies.sessionId

        if(!session_id){
            session_id = randomUUID()
            reply.setCookie('sessionId', session_id, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 7 dias  | 1 semana 
            })
        }

        const usuarioID = await knex('usuario').insert({
            id: randomUUID(),
            fist_name,
            last_name,
            email,
            age,
            session_id,
        }).returning('id')

        return reply.status(201).send({
            message: 'Usuário criado com sucesso - ',
            id: usuarioID[0].id,
        })

    })

}