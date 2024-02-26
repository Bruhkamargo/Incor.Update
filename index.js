const cors = require("cors");
import express, { json } from 'express';
const app = express();

/**define como porta 3001 que eu devo apontar como url= http://localhost:3001/ nos testes
 * ou utiliza a porta que avercel me oferece
 */
const port = process.env.PORT || 3001;

app.use(json());
app.use(cors());


const Teste = 'Funcionando'

/**
 * Verifica a conexão
 */
app.get('/', (req, res) => {
    return res.json('Hello Word!');
});

/**
 * Retorna o Teste
 */
app.get('/teste', (req, res) => {
    return res.json(Teste);
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});