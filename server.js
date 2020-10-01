import * as express from 'express';

const app = express();

app.use(express.static(__dirname+'./dist/pokemon'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/pokemon/'});
});

app.listen(process.env.PORT || 8080);
