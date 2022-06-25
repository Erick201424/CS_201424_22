import { Router } from "express";
import { getChild } from "../models/Childs.js";

const router = Router();

router.get('/list_childs', async function (req, res) {
    getChild.findAll({ attributes: ['id','names', 'lastName', 'secondSurname', 'age'] })
        .then(childs => {
            res.send(childs)
        })
        .catch(err => {
            console.log(err)
        })
});

router.post('/insert_child', async function (req, res) {
    getChild.create({
        id: req.query.id,
        names: req.query.names,
        lastName: req.query.lastName,
        secondSurname: req.query.secondSurname,
        age: req.query.age,
        parentId: req.query.parentId,
    })
        .then((child) => {
            res.send(child)
        })
        .catch(err => {
            res.send(err)
        });
});

router.put('/update_child', async function (req, res) {

    let id = req.query.id;
    let newData = req.query;

    getChild.findOne({ where: { id: id } })
        .then((child) => {
            child.update(newData)
            res.send(newData);
        })
        .catch((e) => {
            res.send(e);
        });
});

router.delete('/delete_child', async function (req, res) {
    let id = req.query.id;
    getChild.destroy({ 
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