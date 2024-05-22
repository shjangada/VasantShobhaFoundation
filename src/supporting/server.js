const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/signup', (req, res) => {
  const formData = req.body;
  const csvData = `${formData.kidName},${formData.parentName},${formData.phoneNumber},${formData.district},${formData.className}\n`;

  fs.appendFile('./csv/Signups.csv', csvData, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error writing to file');
    } else {
      console.log('Data appended to file');
      res.status(200).send('Data appended to file');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
