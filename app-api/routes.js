
var config = require('./config.js');
const { Client } = require('pg')
const client = new Client(config.configDB)

client.connect(err => {
        if (err) {
                console.error('connection error', err.stack);
        } else {
                console.log('connected to PostGresSQL server');
        }
})


var FINDUSER = (request, response) => {

        const dataIncome = request.body;
        var sql_mail = `SELECT * FROM loginusers WHERE name='${dataIncome.mail}' AND pw='${dataIncome.pw}'`;//check if mail existed
        client.query(sql_mail,
                (error, results) => {// callback here
                        if (error) {
                                console.log(" error here");
                                // return console.error(error.message);
                        }
                        else {
                                console.log("here" , results.rows);
                                if (results.rows.length != 0) {

                                        console.log("done");
                                        response.send('EXISTED');
                                } else {
                                        response.send("NOT FOUND");
                                }

                        }

                });//edning connectionn

}

var CREATEUSER = (request, response) => {
        const dataIncome = request.body;
        let sql_insert = `insert into loginusers(name,mail, pw) values ('${dataIncome.name}','${dataIncome.mail}', '${dataIncome.pw}')`;
        let sql_check = `SELECT * FROM loginusers WHERE mail='${dataIncome.mail}'`;//check if mail existed
        // var exist = false;
        client.query(sql_check, (error, results) => {
                if (error) {
                        return console.error(error.message);
                }
                if (results.rows.length != 0) {
                        // exist = true;
                        console.log('existed');
                        response.send('EXISTED');

                } else {
                        client.query(sql_insert,
                                (error, results) => {
                                        if (error) {
                                                console.log(error.message);
                                                console.error(error.message);
                                        }
                                        console.log(results.rows);
                                        console.log("done");
                                        response.send('DONE');
                                });//ending connection 
                }

        });//end connection 1
}


module.exports = {
        FINDUSER,
        CREATEUSER


}