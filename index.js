import * as app from './src/app';

app.get('/', (req, res) => {
  res.end('huy');
});

app.get('/test/:id', (req, res) => {
  res.end('hello world');
});

app.listen(3600, () => console.log(''));
