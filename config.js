module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    db: {
        user: "postgres",
        host: "localhost",
        database: "CSBD",
        password: "admin",
        port: "5432",
    }
}