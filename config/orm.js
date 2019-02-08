//import modules
const connection = require("./connection");

const orm = {

    select: (dbTable, id, cb) => {
        connection.query("SELECT * FROM " + dbTable + " WHERE id= ?", [id], cb);
    },
    
    selectAll: (dbTable, cb) => {
        connection.query("SELECT * FROM " + dbTable, cb);
    },

    insertOne: (dbTable, newData, cb) => {
        connection.query("INSERT INTO " + dbTable + " SET ?", newData, cb);
    },

    updateOne: (dbTable, id, newData, cb) => {

        console.log("ID", id);
        const query = connection.query(
            "UPDATE " + dbTable + " SET ? WHERE id = ?", 
            [newData, id],
            cb
        );
        console.log(query.sql);
    }
}

module.exports = orm;