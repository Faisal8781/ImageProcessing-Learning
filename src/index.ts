import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

// Main Route
app.get('/', (req, res) => {
  res.send('Hello There');
});

//Start API Route to api folder
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});

export { app };
