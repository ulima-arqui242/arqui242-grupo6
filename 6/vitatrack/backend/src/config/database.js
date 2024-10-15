module.exports = {
    postgres: {
        dbname: process.env["DB_NAME"],
        dbuser: process.env["DB_USER"],
        dbpass: process.env["DB_PASSWORD"],
        dbhost: process.env["DB_HOST"],
        dbport: process.env["DB_PORT"]
    },
    cassandra: {
        bundle: process.env["ASTRA_DB_SECURE_BUNDLE_PATH"],
        token: process.env["ASTRA_DB_APPLICATION_TOKEN"]
    }
}