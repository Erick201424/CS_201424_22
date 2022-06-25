import { Router } from "express";
import { getUser } from "../models/Users.js";
import { getParent } from "../models/Parents.js";
import bcrypt from 'bcrypt';

const router = Router();

router.get('/list_users', async function (req, res) {
    getUser.findAll({ 
        include: [{
            model: getParent,
            as: 'Padres: ',
            attributes: ['id','names', 'lastName', 'secondSurname', 'age', 'userId'],
            
        }],
        attributes: ['id', 'username', 'password'] })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            console.log(err)
        })
});

router.post('/insert_user', async function (req, res) {
    getUser.create({
        id: req.query.id,
        username: req.query.username,
        password: req.query.password,
    })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            console.log(err)
        });
});

router.put('/update_user', async function (req, res) {

    let id = req.query.id;
    let newData = req.query;

    getUser.findOne({ where: { id: id } })
        .then((r) => {
            newData.password = newData.password && newData.password != "" ? bcrypt.hashSync(newData.password, 10) : "";
            r.update(newData);
            res.send(newData);
        })

});

router.delete('/delete_user', async function (req, res) {
    let id = req.query.id;
    getUser.destroy({ 
        where: { 
            id: id 
        } 
    }).then(function(rowDeleted) {
        if(rowDeleted === 1) {
            res.send('Deleted succesfully');
        }
    }, function(err) {
        res.send(err);
    })
});



export default router;