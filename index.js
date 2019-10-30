import * as app from './src/app';

app.get('/test/:id', (req, res) => {
  const { id } = req.params;
  res.end(`${id}`);
});

app.get('/', (req, res) => {
  res.end('Hello world');
});

app.listen(3600, () => console.log('Hello World!'));
