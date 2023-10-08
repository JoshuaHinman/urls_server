import dbQuery from '../utilities/db.js';
import express from 'express';
const router = express.Router();

//create new user
router.post('/newUser' , async (req, res) => {

});

//create new short url
router.post('/newUrl' , async (req, res) => {
  const sourceUrl = req.body.sourceUrl; //TODO: change 'sourceUrl' to 'longUrl'
  const shortUrl = req.body.shortUrl;

  if (!sourceUrl) res.send("Error: Invalid Source Url");
  if (!shortUrl) res.send("Error: invalid Short Url");

  try {
    const result = await dbQuery("INSERT INTO urls ( shorturl, longurl) VALUES ($1, $2)",
                            [shortUrl, sourceUrl]);
    res.json(result.fields);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
  
});

//this route should not be exposed to users
router.get('/', async (req, res) => {
  try {
    const result = await dbQuery("SELECT * from urls");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    console.log(process.env.PGUSER,
    process.env.PGPASSWORD,
    process.env.PGHOST,
    process.env.PGPORT,
    process.env.PGDATABASE);
    res.status(500).send(err);
  }
});

//get source url
router.get('/:shortUrl', async (req, res) => {
  const shortUrl = req.params.shortUrl;
  try {
    const result = await dbQuery("SELECT * from urls where shorturl = $1", [shortUrl]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



export default router;