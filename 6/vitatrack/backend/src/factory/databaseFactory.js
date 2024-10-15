const postgres = require("../databases/postgres");
const cassandra = require("../databases/cassandra");

class DatabaseFactory {
    static createDatabase(type) {
        switch (type) {
            case "postgres":
                return postgres;
            case "cassandra":
                return cassandra;
            default:
                throw new Error("Unknown type");
        }
    }
}

module.exports = DatabaseFactory;