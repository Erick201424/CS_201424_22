import { Router } from "express";
import { getImage } from "../models/Images.js";
import multer from "multer";
import path from 'path';


const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

router.get('/list_img', async function(req, res) {
    getImage.findAll({ exclude: ['id'] })
    .then(img => {
        res.send(img);
    })
    .catch(err => {
        res.send(err)
    }) 
});

router.post('/upload', upload.single('image'), async function (req, res) {
    getImage.create({
        image: req.file.path,
        title: req.query.title
    })
        .then(imgs => {
            res.send(imgs)
        })
        .catch(err => {
            console.log(err)
        });
});

export default router;