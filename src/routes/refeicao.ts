import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function refeicaoRoutes( app: FastifyInstance ){

    app.get('/', async (request, reply) => {
        
        return reply.status(200).send({
            message: 'Refeição criada com sucesso.'
        })
    })

}