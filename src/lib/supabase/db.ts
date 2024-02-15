import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as dotenv from 'dotenv'
import * as schema from '../../../migrations/schema'
import { log, error } from 'console'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

dotenv.config({
    path: '.env'
})

if (!process.env.DATABASE_URL) {
    log('🔴 cannot find database url')
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 })

const db = drizzle(client, { schema })

const migrateDB = async () => {
    try {
        log('🟠 migrating client')
        await migrate(db, { migrationsFolder: 'migrations' })
        log('🟢 successfully migrated !!')
    } catch (err) {
        error('🔴 error migrating client', err)
    }
}
migrateDB()

export default db