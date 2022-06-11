import { Router } from "express";
import { success } from "../../../network/response.js";
import { getData } from "../../../model/db.js";
import { getUser } from "../../../model/Users.js";

import cors from "cors";

const router = Router();

router.use(cors());

router.get('/success', function (req, res) {
    success(req, res, "", 200);

});

router.post('/login', function (req, res) {

    let userName = req.query.userName;
    let pasword = req.query.pasword;

    res.send({
        token: "",
        id_user: "1",
        success: "exito",
    });
});

router.get('/all_users', async function (req, res) {
    getUser.findAll({ attributes: ['username', 'email', 'password', 'phone_number'] })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/list', async function (req, res) {
    console.log('listar');
    const client = await getData();

    const query_request = {
        text: 'SELECT * FROM tbl_usersdb'
    }

    client
        .query(query_request)
        .then((r) => {
            success(req, res, r, 200);
        })
        .catch((e) => {
            success(req, res, e.stack, 200);
        });
});

router.post('/register', async function (req, res) {
    //Realizar conexion a DB
    console.log('register');
    const client = await getData();

    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    let phone_number = req.query.phone_number;

    const query_request = {
        text: 'INSERT INTO tbl_usersdb(username, email, password, phone_number) VALUES ($1, $2, $3, $4)',
        values: [username, email, password, phone_number]
    };

    client
        .query(query_request)
        .then((r) => {
            success(req, res, r, 200);
        })
        .catch((e) => {
            success(req, res, e.stack, 200);
        });
});

router.delete('/delete', async function (req, res) {
    //Realizar conexión a DB
    console.log('delete');
    const client = await getData();

    let id = req.query.id;

    const query_request = {
        text: `DELETE FROM tbl_usersdb WHERE id = ${id}`
    };

    client
        .query(query_request)
        .then((r) => {
            success(req, res, r, 200);
        })
        .catch((e) => {
            success(req, res, e.stack, 200);
        });
});

router.put('/update', async function (req, res) {
    //Realizar conexión a DB
    console.log('update');
    const client = await getData();

    let id = req.query.id;
    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    let phone_number = req.query.phone_number;

    const query_request = {
        text: 'UPDATE tbl_usersdb SET username = $1, email = $2, password = $3, phone_number = $4 WHERE id = $5',
        values: [username, email, password, phone_number, id]
    };

    client
        .query(query_request)
        .then((r) => {
            success(req, res, r, 200);
        })
        .catch((e) => {
            success(req, res, e.stack, 200);
        });
});

export default router;