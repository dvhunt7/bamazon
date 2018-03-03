var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "pass",
    database: "bamazondb"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    queryAllitems();

});

function queryAllitems() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " 
            + res[i].product_name + " | " 
            + res[i].department_name + " | " 
            + res[i].price + "|"
            + res[i].stock_quantity );
        }
        console.log("-----------------------------------");
    });
}