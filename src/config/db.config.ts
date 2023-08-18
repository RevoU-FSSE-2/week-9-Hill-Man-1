export const DBConfig = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME
}

export const DB_RailwayConfig = {
    HOST: process.env.DB_RAILWAY_HOST || 'localhost',
    USER: process.env.DB_RAILWAY_USER || 'root',
    PASSWORD: process.env.DB_RAILWAY_PASSWORD || '',
    PORT: process.env.DB_RAILWAY_PORT ? parseInt(process.env.DB_RAILWAY_PORT) : 3306,
    DB_RAILWAY_NAME: process.env.DB_RAILWAY_NAME || 'your_database_name'
};





