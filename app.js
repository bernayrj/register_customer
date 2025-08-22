require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { db } = require('./db/connection');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.post('/submit', async (req, res) => {
    const { nombre, apellido, correo, empresa, contacto, cargo, telefonos } = req.body;
    try {
        const result = await db.query("INSERT INTO customer (customer_name, customer_lastname, customer_email, customer_enterprise, customer_person, customer_position, customer_phone) VALUES (?, ?, ?, ?, ?, ?, ?)", 
            [nombre, apellido, correo, empresa, contacto, cargo, telefonos]);
        res.json( { success: true } );
    } catch (err) {
        console.error(err);
        return res.json({ success: false, error: 'Error al guardar en la base de datos.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
