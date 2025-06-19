const express = require('express');
const conexao = require('./infra/conexao');
const router = require('./routers/index');

// versão do node: 22.11.0

const app = express();
const porta = 3000;

router(app,express);

app.listen(porta,(error) => {
	if (error){
		console.log('Erro ao iniciar servidor express');
		console.log(error.message);
	}
	console.log(`Servidor iniciado com sucesso na porta ${porta}`);
})
