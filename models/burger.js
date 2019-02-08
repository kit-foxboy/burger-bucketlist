//import modules
const orm = require("../config/orm");

function Burger(id, fetchCB = false) {
    
    this.id = id;
    this.burgerName = "";
    this.isEaten = false;

    if (fetchCB !== false) {

        orm.select("burger", this.id, (err, results)=> {

            //handle errors
            if (err) {
                fetchCB(err, null);
            }

            this.burgerName = results[0].burger_name;
            this.isEaten = results[0].is_eaten;
            fetchCB(err, this);
        });
    }
}

const BurgerInterface = {

    getBurger: (id, cb) => {

        const burger = new Burger(id, cb);
    },

    getBurgers: (cb) => {

        //fetch all burgers
        const burgers = [];
        orm.selectAll("burger", (err, results) => {

            //handle errors
            if (err) {
                return cb(err, null);
            }

            //make burger 
            results.forEach((element) => {
                const newBurger = new Burger(element.id);
                newBurger.burgerName = element.burger_name;
                newBurger.isEaten = element.is_eaten;
                burgers.push(newBurger);
            });

            cb(err, burgers);
        });
    },

    addBurger: (burgerName, cb) => {

        //insert new burger
        orm.insertOne("burger", {burger_name: burgerName}, (err, results) => {
            
            //handle errors
            if (err) {
                return cb(err, null);
            }

            const burger = new Burger(results.insertId, cb);
        });
    },

    eatBurger: (burgerId, cb) => {

        orm.updateOne("burger", burgerId, {is_eaten: true}, (err, results) => {

            //handle errors
            if (err) {
                return cb(err, null)
            }

            const burger = new Burger(burgerId, cb);
        });
    }
}

module.exports = BurgerInterface;