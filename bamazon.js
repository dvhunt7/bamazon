var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazondb"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

function queryAllitems() {
    console.log("We have the following items for sale:")
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(
            "Item number: " + res[i].id + " | " +
            "Name: " + res[i].product_name + " | " +
            "Department: "+ res[i].department_name + " | " +
            "Price: " + res[i].price + "|" +
            "Quantity in stock: " + res[i].stock_quantity );
        }
        console.log("-----------------------------------");

        inquire();
    });

   
}

function inquire(){
    inquirer
        .prompt([
            {
                name: "item_id",
                type: 'input',
                message: "Which product would you like to buy? Type the id to select.",
            },
            {
                name: "amount",
                type: "input",
                message: "How many would you like to buy?"
            }
        ])
        .then(function (input) {
          //  console.log(input);
            const item = input.item_id;
            const quantity = input.amount;

            var queryStr = 'SELECT * FROM products WHERE ?';

            connection.query(queryStr, {id:item}, function (err, data) {
                if (err) throw err;

                if (data.length === 0) {
                    console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                    queryAllitems();

                } else {
                    var productData = data[0];

                    if (quantity <= productData.stock_quantity) {
                        console.log('Congratulations, the product you requested is in stock! Placing order!');

                        var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE id = ' + item;

                        connection.query(updateQueryStr, function (err, data) {
                            if (err) throw err;

                            console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
                            console.log('Thank you for shopping with us!');
                            console.log("\n---------------------------------------------------------------------\n");

                            connection.end();
                        })
                    } else {
                        console.log('Unfortunately, we do not have enough of that product in stock');
                        console.log('Please modify your order.');
                        console.log("\n---------------------------------------------------------------------\n");

                        queryAllitems();
                    }
                }
        });
});

};

queryAllitems();
