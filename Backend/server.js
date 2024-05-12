import express from 'express';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/create-post', (req, res) => {
    const data = req.body;
    console.log('Received Data:', data);

    fs.readFile('posts.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log('Error reading file:', err);
            return res.status(500).json({ message: 'Error reading data.' });
        }

        let jsonData = [];
        try {
            jsonData = JSON.parse(jsonString);
        } catch (parseError) {
            console.log('Error parsing JSON:', parseError);
            return res.status(500).json({ message: 'Error parsing JSON data.' });
        }

        jsonData.push(data);

        fs.writeFile('posts.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                console.log('Error writing file:', err);
                return res.status(500).json({ message: 'Error saving data.' });
            }

            console.log('Data saved to posts.json');
            res.json({ message: 'Data received and saved successfully.' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
