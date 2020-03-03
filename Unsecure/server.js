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
    host            : 'www.remotemysql.com',
    user            : 'ubBDTzzpf9',
    password        : 'uIJXame9wr',
    database        : 'ubBDTzzpf9',
    debug           : true
});

/*
function encryptPassword(password) {
    let context = {};
    let query = "SELECT password FROM customer WHERE password = SHA1("+"'"+password+"'"+")";
    pool.query(query, (err, result) => {
		if(err) {
			next(err);
			return;
        }
        context.customer = result;
        console.log("context.customer: " + context.customer);
        return context.customer.password;
    });   
};
*/

app.get('/', function(req, res, next) {
	res.render('login');
});

/*
 *  TO DO: implement password authentication with encryption
 */
app.post('/login',(req, res, next) => {
    let context = {};
    let query = "SELECT id FROM customer WHERE username = " + "'"+req.body.username+"'";
	pool.query(query, (err, result) => {
		if(err) {
			next(err);
			return;
		}
        context.customer = result[0];
        res.redirect('/dashboard/' + context.customer.id);
    });
});


app.get('/dashboard/:id',(req, res, next) => {
    let context = {}
    let query = "SELECT customer.id, customer.first_name, account.checking_account, account.checking_balance, account.credit_card, account.credit_card_balance FROM customer INNER JOIN account ON customer.id = account.customer_id WHERE customer.id = " + "'"+req.params.id+"'";
	pool.query(query, (err, result) => {
		if(err) {
            next(err);
			return;
        }
        context.customer = result[0];
        res.render('dashboard', context);
    });
});

app.get('/personal/:id',(req, res, next) => {
    let context = {};
    let query = "SELECT id, first_name, last_name, email, phone, username, password FROM customer WHERE id = " + req.params.id;
 	pool.query(query, (err, result) => {
 		if(err) {
 			next(err);
 			return;
 		}
 		context.customer = result[0];
 		res.render('personal', context);
    });
});

app.post('/personal/update/:id', (req, res, next) => {
    let query = "UPDATE customer SET first_name = ?, last_name = ?, username = ?, password = SHA1(?), email = ?, phone = ? WHERE id = ?";
    pool.query(query, [req.body.first_name, req.body.last_name, req.body.username, req.body.password, req.body.email, req.body.phone, req.params.id] , (err, result) => {
		if(err) {
			next(err);
            return;       
        }
        res.redirect('/dashboard/' + req.params.id);
    });
});

app.get('/credit/:id',(req, res, next) => {
    let context = {};
    let query = "SELECT customer_id, checking_balance, credit_card_balance, credit_card, checking_account FROM account WHERE customer_id = " + req.params.id;
 	pool.query(query, (err, result) => {
 		if(err) {
 			next(err);
 			return;
 		}
 		context.account = result[0];
 		res.render('credit', context);
    });
});

app.post('/credit/payment/:id', (req, res, next) => {
    let context = {}
    let creditCardBalance = req.body.credit_card_balance - req.body.amount_paid;
    let checkingAccountBalance = req.body.checking_account - req.body.amount_paid;
    let query = "UPDATE account SET checking_balance = ?, credit_card_balance = ?, credit_card = ?, checking_account = ? WHERE customer_id = ?";
    pool.query(query, [checkingAccountBalance, creditCardBalance, req.body.credit_card, req.body.checking_account, req.params.id] , (err, result) => {
		if(err) {
			next(err);
            return;       
        }
        context.account = result;
        addTransaction(req.params.id, req.body.amount_paid);
        res.redirect('/dashboard/' + req.params.id);
    });
});

app.get('/transactions/:id', (req, res, next) => {
    let context = {};
    let query = "SELECT t.id, t.vendor_name, t.amount_paid FROM transactions t INNER JOIN account a ON t.account_id = a.id WHERE a.customer_id = " + req.params.id;
	pool.query(query, (err, result) => {
		if(err) {
			next(err);
			return;
		}
        context.transactions = result;
        context.id = req.params.id;
		res.render('transactions', context);
    });
});

/*
 *  TO DO: implement search for transaction by vendor
 */
app.get('/transactions/:id/:vendor', (req, res, next) => {
    let context = {};
    let query = "SELECT id, account_id, vendor_name, amount_paid FROM transaction WHERE account_id = " + req.params.id + " AND vendor_name LIKE " + "'%"+req.params.vendor+"%'";
	pool.query(query, (err, result) => {
		if(err) {
			next(err);
			return;
		}
		context.transactions = result;
		res.render('dashboard', context);
    });
});

function addTransaction(id, amountPaid) {
    let query = "INSERT INTO transactions (account_id, vendor_name, amount_paid) VALUES(?, ?, ?)";
    pool.query(query, [id, 'Credit Card Payment', amountPaid], (err, result) => {
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