import express from 'express';
import cors from 'cors';

import AdminUser from './routers/AdminUser.js';
import Login from './routers/login.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/data', (req, res) => {
  res.send("Testing the server");
});

app.post('/AdminUser', AdminUser); // now works as route
app.post('/login', Login);

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
