const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = '74cf6bd09f51470390067e5ac25ee336'; // Substitua pela sua chave da football-data.org

app.get('/jogos/:liga', async (req, res) => {
  const liga = req.params.liga;
  const url = `https://api.football-data.org/v4/competitions/${liga}/matches?status=SCHEDULED&include=odds`;

  try {
    const response = await fetch(url, {
      headers: { 'X-Auth-Token': API_KEY }
    });

    if (!response.ok) return res.status(response.status).json({ erro: true });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ erro: true, mensagem: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
