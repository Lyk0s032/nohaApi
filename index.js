const express = require('express');
const bodyParser = require('body-parser');
const {db, Op } = require('./src/db/db');
const { newClient } = require('./src/controllers/comunication');
const { newSubscription } = require('./src/controllers/subscription');

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Bienvenido al servidor de Noah');
});
// Subscribe
app.post('/blog/subscribe/post/new', newSubscription); // Subscribir nuevo cliente.

// Client
app.post('/c/post/new', newClient);   // Nuevo cliente landingPage

// Enciende el servidor
app.listen(PORT, () => {
    db.sync();
    console.log(`Server running on port ${PORT}`);
}); 