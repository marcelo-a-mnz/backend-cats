const helmet = require('helmet')
const xss = require('xss-clean');
const cors = require('cors');
//const mmAdminRouter = require('./mmAdminRouter');
const mmRouter = require('./mmRouter');

module.exports = (app,express) => {
	//app.set('view engine', 'ejs');
	app.use(express.json());
	app.use(express.urlencoded({ extended:true }));
	app.disable('x-powered-by'); // previne fingerprint e possiveis atks
	app.use(helmet()); // protege de vulns conhecidas, setando os headers HTTP adequadamente
	app.use(xss()); // Protege contra xss, substituindo caracteries tipo "<"
	app.use(cors());
	//app.use(mmAdminRouter);
	app.use(mmRouter);
}
