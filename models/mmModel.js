
const conexao = require('../infra/conexao');

class MmModel {

    async executaQuery(sql,parametros = []) {
        try {
            //await conexao.connect();
            const res = await conexao.query(sql,parametros);
            console.log(res.rows);
            return res.rows;
        } catch (error) {
            console.log(error.message);
            return [];
        }
    }

    async hqTags(tag) {
        let whereClause = '';
        const params = [];

        if (tag !== false) {
            whereClause = ` WHERE unaccent(tag) ILIKE unaccent($1)`;
            params.push('%' + tag + '%');
        }

        // Query para retornar todas as tags
        const dataSql = `
            SELECT tagAmigavel, tag, urlCapa
            FROM hqtags
            ${whereClause}
            ORDER BY tag ASC
        `;

        try {
            const dados = await this.executaQuery(dataSql, params);
            return {
                tags: dados,
            };
        } catch (error) {
            console.log('erro:', error.message);
            return false;
        }
    }

    async allHqs(page, q, tag) {
        const limit = 20;
        const offset = (page - 1) * limit;
      
        let baseQuery = `FROM hqfofinhos`;
        const params = [];
        let whereClause = '';
        let whereCount = 1;
      
        if (tag) {
          whereClause = ` WHERE unaccent(tags) ILIKE unaccent($${whereCount})`;
          params.push(`%${tag}%`);
          whereCount++;
        } else if (q) {
          whereClause = ` WHERE unaccent(titulo) ILIKE unaccent($${whereCount}) OR unaccent(tags) ILIKE unaccent($${whereCount + 1})`;
          params.push(`%${q}%`, `%${q}%`);
          whereCount += 2;
        }
      
        const dataSql = `
          SELECT titulo, urlAmigavel, urlCapa
          ${baseQuery}
          ${whereClause}
          ORDER BY id DESC
          LIMIT $${whereCount} OFFSET $${whereCount + 1}
        `;
        params.push(limit, offset);
      
        const countSql = `
          SELECT COUNT(*) as total
          ${baseQuery}
          ${whereClause}
        `;
      
        try {
          const dados = await this.executaQuery(dataSql, params);
          const totalResult = await this.executaQuery(countSql, params.slice(0, whereCount - 1)); // só os parâmetros de filtro
      
          const total = totalResult[0]?.total || 0;
      
          return {
            hqs: dados,
            total
          };
        } catch (error) {
          console.log('Erro:', error.message);
          return false;
        }
    }

    async hqInfos(urlAmigavel) {
        const sql = `
            SELECT titulo,tags,tagsamigaveis,qtd,resumo
            FROM hqfofinhos
            WHERE urlAmigavel = $1
        `;

        try {
            const dados = await this.executaQuery(sql,[urlAmigavel]);
            return dados;
        } catch (error) {
            console.log('Erro:', error.message);
            return false;
        }

    }

    async hqInfosImages(urlAmigavel) {
        const sql = `
            SELECT url,urlAmigavel
            FROM hqimagens
            WHERE urlAmigavel = $1
            ORDER BY id
        `;

        try {
            const dados = await this.executaQuery(sql,[urlAmigavel]);
            return dados;
        } catch (error) {
            console.log('Erro:', error.message);
            return false;
        }

    }
      
}

module.exports = new MmModel();
