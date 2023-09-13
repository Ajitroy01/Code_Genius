const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());

app.post('/convert', async (req, res) => {
    try {
      const { code, targetLanguage } = req.body.data;
      console.log(code, targetLanguage);
      const prompt =  `Convert this code : ${code} \n into ${targetLanguage} language`;
      const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-002/completions', {
        prompt,
        max_tokens : 2000
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type':'application/json'
        },
      });
      console.log(response.data);
      res.json({ convertedCode: response.data.choices[0].text});
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while converting the code.' });
    }
  });
  

app.listen(3001, () => console.log('Server running on port 3001'));
