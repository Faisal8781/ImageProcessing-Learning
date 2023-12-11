import express from 'express';
import routes from './routes/index';
import { log } from 'debug';
const app = express();
const port = 3000;

// Main Route
app.get('/', (req, res) => {
  res.send('Hello There');
});

// Start API Route to api folder
app.use('/api', routes);

app.listen(port, () => {
  log(`Listening on port http://localhost:${port}`);
});

export { app };
