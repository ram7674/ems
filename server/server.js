import express from 'express';
import cors from 'cors';

import Login from './routers/login.js';
import {authMiddleware, verify} from './middleware/AuthMiddleware.js';
    
const app = express();
app.use(cors());
app.use(express.json());

app.get('/data', (req, res) => {
  res.send("Testing the server");
});

// app.post('/AdminUser', AdminUser); 
app.post('/login', Login);
app.post('/verify', authMiddleware, verify)

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
