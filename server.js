const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { body, validationResult } = require('express-validator');

// Creating an Express Application
const app = express();

app.use(express.json({
    verify: (req, res, buf, encoding) => {
        try {
            JSON.parse(buf.toString(encoding));
        } catch (e) {
            throw new SyntaxError('Invalid JSON format in request body.');
        }
    }
}));

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.message.includes('Invalid JSON')) {
        return res.status(400).json({ error: err.message });
    }
    next();
});

app.use(bodyParser.json());
app.use(express.json());

// PostgreSQL Connection Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vehicles_db',
    password: '200105',
    port: 5432,
});

app.get('/vehicle', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Vehicle');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/vehicle',
    async (req, res) => {

        const { vin, manufacturer_name, description, horse_power, model_name, model_year, purchase_price, fuel_type } = req.body;

        try {
            const parsedUserData =
                JSON.parse(JSON.stringify(req.body));
            if(Object.keys(parsedUserData).length === 0)
                return res.status(400).json({ error: 'Invalid JSON format in request body.' });

        } catch (err)
        {
            return res.status(400).json({ error: 'Invalid JSON format in request body.' });

        }

    if (!vin || !manufacturer_name || !model_name || !model_year || !purchase_price || !fuel_type) {
        return res.status(422).json({ error: 'Missing or invalid fields in the request body.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO Vehicle (vin, manufacturer_name, description, horse_power, model_name, model_year, purchase_price, fuel_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [vin, manufacturer_name, description, horse_power, model_name, model_year, purchase_price, fuel_type]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/vehicle/:vin', async (req, res) => {
    const { vin } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Vehicle WHERE vin = $1', [vin]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Vehicle not found' });
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/vehicle/:vin', async (req, res) => {
    const { vin } = req.params;
    const { manufacturer_name, description, horse_power, model_name, model_year, purchase_price, fuel_type } = req.body;
    try {
        const parsedUserData =
            JSON.parse(JSON.stringify(req.body));
        if(Object.keys(parsedUserData).length === 0)
            return res.status(400).json({ error: 'Invalid JSON format in request body.' });

    }catch (err)
    {
        return res.status(400).json({ error: 'Invalid JSON format in request body.' });

    }
    if (!manufacturer_name || !model_name || !model_year || !purchase_price || !fuel_type) {
        return res.status(422).json({ error: 'Missing or invalid fields in the request body.' });
    }

    try {
        const result = await pool.query(
            'UPDATE Vehicle SET manufacturer_name = $2, description = $3, horse_power = $4, model_name = $5, model_year = $6, purchase_price = $7, fuel_type = $8 WHERE vin = $1 RETURNING *',
            [vin, manufacturer_name, description, horse_power, model_name, model_year, purchase_price, fuel_type]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Vehicle not found' });
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/vehicle/:vin', async (req, res) => {
    const { vin } = req.params;
    try {
        const result = await pool.query('DELETE FROM Vehicle WHERE vin = $1', [vin]);
        if (result.rowCount === 0) return res.status(404).json({ error: 'Vehicle not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Starting the server and then listening on port 3000
module.exports = app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

