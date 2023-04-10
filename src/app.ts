import fastify from 'fastify'
import { usuariosRoutes } from './routes/usuarios'
import cookie from '@fastify/cookie'
import { refeicaoRoutes } from './routes/refeicao'

export const app = fastify()

app.register(cookie)

app.register(usuariosRoutes, { prefix: '/usuario'})

app.register(refeicaoRoutes, { prefix: '/refeicao'})