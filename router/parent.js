import { Router } from "express";
import { getParent } from "../models/Parents.js";
import { getChild } from "../models/Childs.js";

const router = Router();

router.get('/list_parents', async function (req, res) {
    getParent.findAll({ 
        include: [{
            model: getChild,
            as: 'Hijos: ',
            attributes: ['names', 'lastName', 'secondSurname', 'age'],
        }],
        attributes: ['names', 'lastName', 'secondSurname', 'age'] })
        .then(parents => {
            res.send(parents)
        })
        .catch(err => {
            console.log(err)
        })
});

router.post('/insert_parent', async function (req, res) {
    getParent.create({
        id: req.query.id,
        names: req.query.names,
        lastName: req.query.lastName,
        secondSurname: req.query.secondSurname,
        age: req.query.age,
        userId: req.query.userId,
    })
        .then((parent) => {
            res.send(users)
        })
        .catch(err => {
            res.send(err)
        });
});

router.put('/update_parent', async function (req, res) {
   
    let id = req.query.id;
    let newData = req.query;

    getParent.findOne({ where: { id: id } })
        .then((parent) => {
            parent.update(newData);
            res.send(newData);
        })
        .catch((e) => {
            res.send(e);
        });
});


router.delete('/delete_parent', async function (req, res) {
    let id = req.query.id;
    getParent.destroy({ 
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
})


export default router;