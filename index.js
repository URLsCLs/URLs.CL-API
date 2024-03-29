require('dotenv').config();
const { query } = require('./modules/db');
var bodyParser = require('body-parser');
const express = require('express');
const { nanoid } = require('nanoid');
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded());


const auther = async (req, res, next) => {
  // if method is get next()
  if (req.method == 'GET') {
    next();
    return;
  }

  let token = (await query('select * from access'));
  token = token.find((t) => t.token == req.headers['appkey']);
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  next();
};
app.use(auther);


app.get('/slug/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    let shrt = await query('SELECT * FROM slugs WHERE slug = ?', [slug])
    if (shrt.length != 0) {
      res.status(200).json(shrt[0])
    } else {
      res.status(404).json({ error: 'Slug not found' })
    }
  } catch (error) {
    res.status(404).json({ error: 'Slug not found' })
  }
})

app.post('/slug', async (req, res) => {
  let url = req.body.url;

  if (url.toLowerCase().includes('urls.cl')) {
    return Promise.reject('Are you kidding me?');
  }

  let slug = nanoid(Math.floor(Math.random() * (7 - 3) + 3));
  try {
    let shrt = await query('SELECT * FROM slugs WHERE slug = ?', [slug])
    if (shrt.length != 0) {
      slug = nanoid(Math.floor(Math.random() * (7 - 3) + 3));
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' })
    console.log(error)
  }

  try {
    let shrt = await query('INSERT INTO slugs (slug, url) VALUES (?, ?)', [slug, url])
    res.status(200).json({ slug: slug, url: url })
    return;
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' })
    console.log(error)
  }
  res.status(500).json({ error: 'Something went wrong' })
})

app.get('/', async (req, res) => {
  res.redirect('https://urls.cl')
})





const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});