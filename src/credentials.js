module.exports = {
    database: {
        mysql: {
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
    },
    cookie: {
        secret: 'my_secret@',
    }
}
