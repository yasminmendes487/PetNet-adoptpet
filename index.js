const express = require('express');
const app = express();
const PORT = 3000;

// Rota de teste
app.get('/', (req, res) => {
  res.send('Bem-vindo ao sistema de adoção de pets!');
});

// Servidor configurado
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
