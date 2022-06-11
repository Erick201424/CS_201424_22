const express = require('express');
const response = require('../../../network/response');
const { getConnection } = require('../../../model/db');
const { text } = require('express');
const { Query } = require('pg/lib');

const router = express.Router();

router.get('/success', function (req, res) {
    response.success(req, res, "", 200);

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


router.post('/register', async function (req, res) {
    //Realizar conexion a DB
    console.log('register');
    const client = await getConnection();

    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    let phone_number = req.query.phone_number;

    console.log(username, email, password, phone_number)

    const query_request = {
        text: 'INSERT INTO tbl_usersdb(username, email, password, phone_number) VALUES ($1, $2, $3, $4)',
        values: [username, email, password, phone_number]
    };

    client.query(query_request)
        .then(r => { console.log('1'); response.success(req, res, r, 200); })
        .catch(e => { console.log('2'); response.success(req, res, e.stack, 200); })
});

router.delete('/delete', async function (req, res) {
    //Realizar conexion a DB
    const client = await getConnection();

    let idUser = req.query.id;

    const query_request = {
        text: `delete from tbl_usersdb where id = ${idUser}`
    };

    client.query(query_request)
        .then(r => { console.log('1'); response.success(req, res, r, 200); })
        .catch(e => { console.log('2'); response.success(req, res, e.stack, 200); })
});

router.put('/update', async function (req, res) {
    //Realizar conexion a DB
    const client = await getConnection();

    let idUser = req.query.id;
    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    let phone_number = req.query.phone_number;

    const query_request = {
        text: `UPDATE  tbl_usersdb SET username= '${username}', email= '${email}', password= '${password}', phone_number= '${phone_number}' WHERE id= '${idUser}'`
    };

    client.query(query_request)
        .then(r => { console.log('1'); response.success(req, res, r, 200); })
        .catch(e => { console.log('2'); response.success(req, res, e.stack, 200); })
});

router.get('/list', async function (req, res) {
    //Realizar conexion a DB
    const client = await getConnection();

    const query_request = {
        text: 'select * from tbl_usersdb'
    };
    client.query(query_request, (err,result) => {
        res.send(result.rows)
    })
});

module.exports = router;