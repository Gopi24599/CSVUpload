const express = require('express');
const router = express.Router();
const multer = require('multer');

// Controllers

const homecontroller = require ('../controllers/home_controller');
const filecontroller = require ('../controllers/file_controller');
const upload = muler({dest: 'uploads/files'});

//Routes
router.get('/', homecontroller);
router.post('/upload',upload.single('file'), filecontroller.upload);
router.get('/view/:id', filecontroller.view);
router.get('/delete/:id', filecontroller.delete);

module.exports = router;