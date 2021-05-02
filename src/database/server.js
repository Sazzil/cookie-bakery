/* two packages are installed for database connection and for data Insert

    - Sqlite3
    - express */

/* for Cross-Origin Resource Sharing used the package 'CORS' */  

const sqlite3 = require('sqlite3').verbose();

const express = require('express');

const cors = require('cors');

const app = express();

app.use( cors( {
    origin: true,
    credentials: true
}));

class dbconnection {
    constructor() {
        this.location = '../../db/bakery.db';

        this.db = new sqlite3.Database( this.location, (err) => {
            if (err){
                console.log(err);
            }

            console.log("> Database connection is established");
        });
    }

    run(sql,res) {
        this.db.run(sql, [], (err) => {
            if(err){
                console.error(err.message);
            }
            console.log(sql);
            res.send('ok');
        });
    }

    all(sql, res) {
        this.db.all( sql, [], (err, rows) => {
            if(err){
                console.error(err.message);
            }
            res.json( 
                {
                    model:rows
                }
            );
        });
    }
}

const dbCon = new dbconnection();

/* Read data from database*/
app.get('/', (req, res) => {
    const sql = "SELECT * from orders;"

    dbCon.all(sql, res);
});

/* Insert data into database*/
app.post('/create/', (req,res) => {
    const sql = "Insert INTO orders(order_time) VALUES(datetime('now', 'localtime'))";

    dbCon.run(sql, res);
});

app.listen( 3000, () => {
    console.log(" > listening on port 3000");
});