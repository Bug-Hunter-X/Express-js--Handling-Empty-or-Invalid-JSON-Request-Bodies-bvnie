const express = require('express');
const app = express();
app.use(express.json({ limit: '50mb' })); // added limit for large requests
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Invalid JSON:', err);
    return res.status(400).send({ error: 'Invalid JSON payload' });
  }
  next();
});
app.post('/data', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    console.log('Empty request body received.');
    return res.status(400).send({ error: 'Empty request body' });
  }
  console.log(req.body);
  res.send('OK');
});
app.listen(3000, () => console.log('Server listening on port 3000'));