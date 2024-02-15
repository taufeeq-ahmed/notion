import type, { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'
import { error } from 'console'
dotenv.config({
    path: '.env'
})

if (!process.env.DATABASE_URL) {
    error('🔴 cannot find database url')
}

export default {
    schema: './src/lib/supabase/schema.ts',
    out: './migrations',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL || ''
    }
} satisfies Config