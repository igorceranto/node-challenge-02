import { Knex } from 'knex'

declare module 'knex/types/tables'{

    export interface Tables {
        usuario: {
            id: string
            fist_name: string
            last_name: string
            email: string
            age: number
            created_at: string
            session_id: string
        },
        refeicoes: {
            id: string
            nome: string
            descricao: string
            created_at: string
            diet: boolean
            usuario_id: string
        }
    }
}