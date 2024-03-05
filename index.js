import cors from "cors";
import express, { json } from 'express';
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';
const app = express();


/**define como porta 3001 que eu devo apontar como url= http://localhost:3001/ nos testes
 * ou utiliza a porta que avercel me oferece
 */
const port = process.env.PORT || 3001;

app.use(json());
app.use(cors());

const Teste = 'Funcionando';
const users = [];

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: "postgres://default:F3qEORZUDAx9@ep-lucky-bonus-a61t175b-pooler.us-west-2.aws.neon.tech:5432/verceldb?sslmode=require",
});


app.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM contatos');
        return res.json(rows);
    } catch (error) {
        console.error('Erro ao executar a consulta SQL', error);
        res.status(500).send('Erro interno do servidor');
    }
});

/**
 * Retorna o Teste
 */
app.get('/teste', (req, res) => {
    return res.json(Teste);
})

/**
 * Retorna os "usuarios"
 */
app.get('/users', (req, res) => {
    return res.json(users);
})

/*
app.post('/setusers', async (req, res) => {
    const { Nome, Email, Telefone } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO Contatos (id, Nome, Email, Telefone) VALUES ($1, $2, $3, $4) RETURNING *',
            [uuidv4(), Nome, Email, Telefone]
        );

        const newUser = result.rows[0];
        return res.json(newUser);
    } catch (error) {
        console.error('Erro ao inserir usuário no banco de dados', error);
        res.status(500).send('Erro interno do servidor');
    }
});*/

/* Função Original*/
app.post('/setusers', (req, res) => {
    const { Nome, Email, Telefone } = req.body;
    const NewUser = {
        id: uuidv4(),
        Nome: Nome,
        Email: Email,
        Telefone: Telefone
    }
    users.push(NewUser);

    return res.json(NewUser);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});