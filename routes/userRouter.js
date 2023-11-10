import dbQuery from '../utilities/db.js';
import express from 'express';
const router = express.Router();

//signup new user
router.post('/signup', async (req, res) => {
  const { name, password, email } = req.body;

  if (!name) res.send("Error: Invalid name");
  if (!password) res.send("Error: invalid password");
  if (!email) res.send("Error: Invalid email");

  try {
    const result = await dbQuery("INSERT INTO users ( name, password, email) VALUES ($1, $2, $3)",
                            [name, password, email]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

//login user
router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const result = await dbQuery("select * from users where name = $1 and password = $2", [name, password]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

export default router;