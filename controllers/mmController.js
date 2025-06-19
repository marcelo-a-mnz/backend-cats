const mmModel = require('../models/mmModel');
class MmController {
    async hqTags(req, res) {
        try {
            const { tag } = req.params || undefined;
            console.log(`Retornando tags ${tag} ...`);

            const resultado = await mmModel.hqTags(tag);

            const formattedTags = resultado.tags.map(tag => ({
                tagAmigavel: tag.tagamigavel,
                tag: tag.tag,
                urlCapa: tag.urlcapa,
            }));

            return res.status(200).json({
                tags: formattedTags,
            });
        } catch (error) {
            return res.status(500).json({ message: 'Ocorreu um erro ao retornar informações de tag ' + error });
        }
    }

    async allHqs(req, res) {
        try {
            const page = parseInt(req.params.page) || 1;
            const q = req.query.q || false;
            const tag = req.query.tag ? req.query.tag.replaceAll('-', ' ') : false;
            
            console.log(`Retornando todas as hqs com paginação (page ${page}) (q ${q}) (tag ${tag})`);

            const resultado = await mmModel.allHqs(page, q, tag);

            if (!resultado || resultado.hqs.length === 0) {
                return res.status(404).json({ message: 'HQs não encontradas' });
            }

            const formattedHqs = resultado.hqs.map(hq => ({
                titulo: hq.titulo,
                urlAmigavel: hq.urlamigavel,
                urlCapa: hq.urlcapa,
                novo: hq.novo
            }));
            

            return res.json({
                hqs: formattedHqs,
                total: resultado.total
            });

        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async hqInfos(req,res) {
        const { urlAmigavel } = req.params;
        console.log(`Retornando informações do HQ ${urlAmigavel}`);

        const hInfos = await mmModel.hqInfos(urlAmigavel);
        const imgUrls = await mmModel.hqInfosImages(urlAmigavel);

        const response = {
            titulo: hInfos[0].titulo || 'Título não encontrado',
            resumo: hInfos[0].resumo || 'Resumo não encontrado',
            tags: hInfos[0].tags || '',
            tagsAmigaveis: hInfos[0].tagsamigaveis || '',
            qtd: hInfos[0].qtd || 0,
            imagens: imgUrls.map(img => img.url)
        };

        return res.json(response);
    }

}

module.exports = new MmController();
