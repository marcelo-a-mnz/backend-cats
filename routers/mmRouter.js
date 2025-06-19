
const { Router } = require('express');
const mmController = require('../controllers/mmController');

/*
TODO:
Rota pesquisarHq (titulo,tag) [OK];
Rota retornar hqs daquela tag [OK];
Rota pra retornar tags; [OK];
Rota para retornar h que possuem uma tag. [OK];
Rota novo acesso HQ (com mecanismo anti-bot) (ou talvez seja melhor usar analytics);
Melhorar rota all-hqs, adcionando a quantidade total na resposta para ser trabalhada na paginação no front [OK];

04/05/2025
Exibir primeiro os HQs recém cadastrados no index.ejs [OK];
10/05/2025
Escolher tag aleatória da hq e colocar no 'voce também vai gostar' (no front) [OK];
Retornar tags em ordem alfabética [OK];

*/

const router = Router();

router.get('/all-hqs/:page?',mmController.allHqs);
router.get('/hq-infos/:urlAmigavel',mmController.hqInfos);
//router.get('/tags0/:tag?',mmController.hqTags0);
router.get('/tags/:tag?',mmController.hqTags);
//router.get('/novo-acesso/:urlAmigavel',) // todo: registrar novo acesso ao HQ



module.exports = router;
