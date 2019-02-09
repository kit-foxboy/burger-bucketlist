//import modules
const db = require("../models/burger");

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

            if(err) {
                res.sendStatus(500);
            }
            
            res.render("new-burger-api", {layout: false, id: results.id, burgerName: results.burgerName});
        });
    });
    
    app.post("/api/eat-burger:id", (req, res) => {
        
        if (!req.params.id) {
            return res.sendStatus(400);
        }

        db.eatBurger(req.params.id, (err, results) => {
            
            if(err) {
                res.sendStatus(500);
            }
            
            res.render("burger-api", {layout: false, id: results.id, burgerName: results.burgerName});
        });
        
    });
    
    app.get("/", (req, res) => {

        db.getBurgers((err, results) => {

            if (err) {
                return res.sendStatus(500);
            }

            const toEat = [];
            const eaten = [];

            results.forEach((element) => {
                if(element.isEaten) {
                    eaten.push(element);
                } else {
                    toEat.push(element);
                }
            });

            res.render("index", {burgers: {toEat: toEat, eaten: eaten}});
        });
    });

    app.get("*", (req, res) => {
        res.render("404");
    });
}