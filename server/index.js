require('dotenv').config({ path: 'variables.env' });

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const Chatkit = require('@pusher/chatkit-server');
const port = process.env.PORT || 5200;

const app = express();

const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
  key: process.env.CHATKIT_SECRET_KEY,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/users', (req, res) => {
  const { username } = req.body;

  chatkit
    .createUser({
      id: username,
      name: username,
    })
    .then(data => {
      res.status(201).send({ id: username, username: username });
    })
    .catch(err => {
      if (err.error === 'services/chatkit/user_already_exists') {
        res.status(200).send({ id: username, username: username });
      } else {
        res.status(500).json(err);
      }
    });
});

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id,
  });
  res.status(authData.status).send(authData.body);
});

app.listen(port, function() {
  console.log(`Service is running at ${port}`);
});
