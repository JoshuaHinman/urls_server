import dbQuery from '../utilities/db.js';
import express from 'express';
const router = express.Router();

//create new shorturl
router.post('/newUrl' , async (req, res) => {
  const longurl = req.body.longurl;
  const shorturl = req.body.shorturl;

  if (!longurl) res.send("Error: Invalid Source Url");
  if (!shorturl) res.send("Error: invalid Short Url");

  try {
    const result = await dbQuery("INSERT INTO urls ( shorturl, longurl) VALUES ($1, $2)",
                            [shorturl, longurl]);
    res.json(result.fields);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
  
});

//this route should not be exposed to users
router.get('/', async (req, res) => {
  try {
    const result = await dbQuery("SELECT * FROM urls");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

//get source url
router.get('/:shorturl', async (req, res) => {
  const shorturl = req.params.shorturl;
  try {
    const result = await dbQuery("SELECT longurl from urls where shorturl = $1", [shorturl]);
    const longurl = result.rows[0].longurl;
    console.log(longurl);
    res.redirect("https://" + longurl);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



export default router;