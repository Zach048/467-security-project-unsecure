var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
var bodyParser = require('body-parser');
var mysql = require('mysql');
var methodOverride = require('method-override');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8080);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));

var pool = mysql.createPool({
    host            : 'bank.ch5qjjtirlbl.us-east-2.rds.amazonaws.com:3306',
    user            : 'admin',
    password        : '467security',
	database        : 'unsecured_bank'
	
});

app.get('/customer/:id',(req, res, next) => {
	let context = {};
    let query = "SELECT id, first_name, last_name, username, password, email, phone FROM customer WHERE id = " + req.param.id;
	pool.query(query, (err, result) => {
		if(err) {
			next(err);
			return;
		}
		context.customer = result;
		res.render('customer', context);
    });
});

app.post('/customer/login/:userName',(req, res, next) => {
	let context = {};
    let query = "SELECT id, first_name, last_name, username, password, email, phone FROM customer WHERE username = " + req.params.userName;
	pool.query(query, (err, result) => {
		if(err) {
			next(err);
			return;
		}
        context.customer = result;
        if(encryptPassword(req.body.password) === context.customer.password) {
            res.send(context.customer.id);
        }
        else {
            res.send(-1);
        }
    });
});

app.put('/customer/update/:id', (req, res, next) => {
    let query = "UPDATE customer SET first_name = ?, last_name = ?, username = ?, password = SHA1(?), email = ?, phone = ? WHERE id = ?";
    pool.query(query, [req.body.first_name, req.body.last_name, req.body.username, req.body.password, req.body.email, req.body.phone, req.params.id] , (err, result) => {
		if(err) {
			next(err);
            return;       
        }
        res.redirect('/customer');

});

app.get('/account/:id',(req, res, next) => {
	let context = {};
    let query = query = "SELECT id, customer_id, checking_balance, credit_card_balance, credit_card, checking_account FROM account WHERE id = " + req.params.id;
	pool.query(query, (err, result) => {
		if(err) {
			next(err);
			return;
		}
		context.account = result;
		res.render('customer', context);
    });
});

app.put('/account/update/:id', (req, res, next) => {
    let query = "UPDATE account SET customer_id = ?, checking_balance = ?, credit_card_balance = ?, credit_card = ?, checking_account = ? WHERE id = ?";
    pool.query(query, [req.body.customer_id, req.body.checking_balance, req.body.credit_card_balance, req.body.credit_card, req.body.checking_account, req.params.id] , (err, result) => {
		if(err) {
			next(err);
            return;       
        }
        res.redirect('/customer');

});

app.put('/account/payCreditCard/:amountPaid', (req, res, next) => {
    let context = {}
    let creditCardBalance = req.body.credit_card_balance - req.params.amountPaid;
    let checkingAccountBalance = req.body.checking_account - req.params.amontPaid;
    let query = "UPDATE account SET customer_id = ?, checking_balance = ?, credit_card_balance = ?, credit_card = ?, checking_account = ? WHERE id = ?";
    pool.query(query, [req.body.customer_id, checkingAccountBalance, creditCardBalance, req.body.credit_card, req.body.checking_account, req.params.id] , (err, result) => {
		if(err) {
			next(err);
            return;       
        }
        context.account = result;
        addTransaction(result);
        res.redirect('/customer');
});

app.get('/transactions/:id', (req, res, next) => {
    let context = {};
    let query = "SELECT id, account_id, vendor_name, amount_paid FROM transaction WHERE id = " + req.param.id;
	pool.query(query, (err, result) => {
		if(err) {
			next(err);
			return;
		}
		context.transactions = result;
		res.render('transactons', context);
    });
});

app.get('/transactions/:id/:vendor', (req, res, next) => {
    let context = {};
    let query = "SELECT id, account_id, vendor_name, amount_paid FROM transaction WHERE account_id = " + req.param.id + " AND vendor_name LIKE " + "'%"+req.param.vendor+"%'";
	pool.query(query, (err, result) => {
		if(err) {
			next(err);
			return;
		}
		context.transactions = result;
		res.render('transactons', context);
    });
});

function encryptPassword(password) {
    let context = {};
    let query = "SELECT password FROM customer WHERE password = SHA1("+"'"+password+"'"+")";
    pool.query(query, (err, result) => {
		if(err) {
			next(err);
			return;
        }
        context.customer = result;
        return context.customer.password;
    });   
}

function addTransaction(transaction) {
    let query = "INSERT INTO transactions (account_id, vendor_name, amount_paid) VALUES(?, ?, ?)";
    pool.query(query, [transaction.account_id, 'Credit Card Payment', transaction.amount_paid], (err, result) => {
        if(err) {
			next(err);
            return;       
        }
    });
}

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on port ' + app.get('port') + '; press Ctrl-C to terminate.');
});






