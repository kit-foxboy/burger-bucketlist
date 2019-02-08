//import modules
const db = require("../models/Burger");

module.exports = (app) => {

    app.get("/api/burgers", (req, res) => {

        db.getBurgers((err, results) => {
            res.json((err) ? err :results);
        });
    });

    app.post("/api/add-burger", (req, res) => {
        
        if (!req.body.burgerName) {
            return res.sendStatus(400);
        }

        db.addBurger(req.body.burgerName, (err, results) => {
            res.json((err) ? err :results);
        });
    });

    app.post("/api/eat-burger:id", (req, res) => {
        
        if (!req.params.id) {
            return res.sendStatus(400);
        }

        db.eatBurger(req.params.id, (err, results) => {
            res.json((err) ? err :results);
        });
    });
}