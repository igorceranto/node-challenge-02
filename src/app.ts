import fastify from 'fastify'
import { usuariosRoutes } from './routes/usuarios'

export const app = fastify()

app.register(usuariosRoutes, { prefix: '/usuario'})