var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

Ticket = require('./models/trainInfo');
OrderTickets = require('./models/orderTickets');
User = require('./models/user');
creditPayments = require('./models/creditPayments');
mobilePayments = require('./models/mobilePayments');

//Data to send SMS
const accountSid = 'AC7631669593e6f33242716bf112b5af0e';
const authToken = '086d1503a8d9d148141467e8a8993c2b';
const client = require('twilio')(accountSid, authToken);

//connect to Mongoose
mongoose.connect('mongodb://localhost/trainticket');
var db = mongoose.connection;

/*
* Load the application
* */
app.get('/', function (req,res) {
    res.send('hello world');
});

/*
* Send sms API
* */
app.post('/api/sms',(req,res)=>{
    console.log(req.body)
    const {contnum,message}=req.query

    client.messages.create({
        body:message,
        to:"+94"+contnum,
        from:'' //enter your twilio genearted number here
    }).then((message)=>console.log(message.body)).catch(err=>{console.log(err)});

})
/*
* Send email API
* */
app.post('/api/form', (req, res) => {
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `

        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: '587',
            auth: {
                user: 'arnold.runolfsdottir@ethereal.email',
                pass: 'Qw6RzHyvVGMCgcM6ZV'
            }
        })

        let mailOptions = {
            from: 'test@testaccount.com',
            to: 'arnold.runolfsdottir@ethereal.email',
            replyTo: 'test@testaccount.com',
            subject: 'New message',
            text: req.body.message,
            html: htmlEmail
        }
        transporter.sendMail(mailOptions, (err,info) => {
            if(err){
                console.log(err);
            }

            //console.log('Message sent: %s', info.message)
            console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
        })
    })
});

/*
* Train Information handling API
* */
app.get('/api/trainInfo', function (req, res) {
    Ticket.getTrainInfo(function (err, trainInfo) {
        if(err){
            throw err;
        }
        res.json(trainInfo);
    });
});

app.get('/api/trainInfo/:_id', function (req, res) {//:id means what ever id passed into it
    Ticket.getTrainById(req.params._id,function (err, trainInfo) {
        if (err){
            throw err;
        }
        res.json(trainInfo);
    });
});

app.post('/api/trainInfo', function (req, res) {
    var train = req.body; //save everything in form into genre object
    Ticket.addTrain(train, function (err, train) {
        if (err){
            throw err;
        }
        res.json(train);
    });
});

app.put('/api/trainInfo/:_id', function (req, res) {
    var id = req.params._id;
    var train = req.body; //save everything in form into genre object
    Ticket.updateTrainInfo(id, train, {},function (err, train) {
        if (err){
            throw err;
        }
        res.json(train);
    });
});

app.delete('/api/trainInfo/:_id', function (req, res) {
    var id = req.params._id;
    Ticket.deleteTrainInfo(id,function (err, train) {
        if (err){
            throw err;
        }
        res.json(train);
    });
});

/*
* Oder Tickets Information handling API
* */
app.get('/api/orderTickets', function (req, res) {
    OrderTickets.getOrderTickets(function (err, orderTickets) {
        if(err){
            throw err;
        }
        res.json(orderTickets);
    });
});

app.get('/api/orderTickets/:_id', function (req, res) {//:id means what ever id passed into it
    OrderTickets.getOrderTicketById(req.params._id,function (err, orderTickets) {
        if (err){
            throw err;
        }
        res.json(orderTickets);
    });
});


app.post('/api/orderTickets', function (req, res) {
    var order = req.body; //save everything in form into genre object
    OrderTickets.addOrderTicketInfo(order, function (err, order) {
        if (err){
            throw err;
        }
        res.json(order);
    });
});

app.put('/api/orderTickets/:_id', function (req, res) {
    var id = req.params._id;
    var order = req.body; //save everything in form into genre object
    OrderTickets.updateOrderTrainInfo(id, order, {},function (err, order) {
        if (err){
            throw err;
        }
        res.json(order);
    });
});

app.delete('/api/orderTickets/:_id', function (req, res) {
    var id = req.params._id;
    OrderTickets.deleteOrderTrainInfo(id,function (err, order) {
        if (err){
            throw err;
        }
        res.json(order);
    });
});

/*
* User Information handling API
* */
app.get('/api/user', function (req, res) {
    User.getuser(function (err, user) {
        if(err){
            throw err;
        }
        res.json(user);
    });
});

app.post('/api/user', function (req, res) {
    var user = req.body; //save everything in form into genre object
    User.addUser(user, function (err, user) {
        if (err){
            throw err;
        }
        res.json(user);
    });
});

/*
* Credit Card Payments handling API
* */
app.get('/api/creditPay', function (req, res) {
    creditPayments.getCreditPaymentData(function (err, credit) {
        if(err){
            throw err;
        }
        res.json(credit);
    });
});

app.post('/api/creditPay', function (req, res) {
    var credit = req.body; //save everything in form into genre object
    creditPayments.addCreditPaymentData(credit, function (err, credit) {
        if (err){
            throw err;
        }
        res.json(credit);
    });
});

/*
* Mobile Payments handling API
* */
app.get('/api/mobilePay', function (req, res) {
    mobilePayments.getMobilePaymentData(function (err, mobile) {
        if(err){
            throw err;
        }
        res.json(mobile);
    });
});

app.post('/api/mobilePay', function (req, res) {
    var mobile = req.body; //save everything in form into genre object
    mobilePayments.addMobilePaymentData(mobile, function (err, mobile) {
        if (err){
            throw err;
        }
        res.json(mobile);
    });
});

app.listen(5000);
console.log('Running on port 5000....');

























