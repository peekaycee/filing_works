const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML form)
app.use(express.static('public'));

app.post('/submit-form', (req, res) => {
    const formData = req.body;

    fs.readFile('database.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading database file.');
        }

        let json = [];
        if (data) {
            json = JSON.parse(data);
        }

        json.push(formData);

        fs.writeFile('database.json', JSON.stringify(json, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error writing to database file.');
            }

            res.send('Form data saved successfully!');
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});