const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

// //Définir le lieux de stockage (à utiliser si au lieu du router.postecho "# express-et-generateur" >> README.md)
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/images/')
//   },
//   filename: function (req, file, cb) {
//     //console.log(filename)
//     cb(null, file.originalname)
//   }
// })

//Les fichiers .png (3Mo max) se chargent dans le dossier tmp
const upload = multer({ 
  dest: 'tmp/',
  //storage,
  limits: {
    fileSize: 3 * 1024 * 1024 // =3Mo
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes('image/png')) {
      cb(new Error('Mauvais format de fichier'));
    }
    cb(null, true); // OK -> Tu peux continuer
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/***********************************POUR 1 FICHIER********************************* */
/*Mise en place du formulaire */
router.get('/uploaddufichier', function (req, res, next) {
  res.send(`<form method="POST" enctype="multipart/form-data" action="uploaddufichier">
  <input type="file" name="monfichier">
  <button> envoyer </button>
  </form>`)
})

router.post('/uploaddufichier', upload.single('monfichier'), function (req, res) {
  //res.send(req.file.path)
  fs.rename(req.file.path, 'public/images/' + req.file.originalname, function(err){
    if (err) {
        res.send('problème durant le déplacement');
    } else {
        res.send('Fichier uploadé avec succès');
    }
  });
})

/***********************************POUR PLUSIEURS FICHIERS********************************* */

/*Mise en place du formulaire */
router.get('/monupload', function (req, res, next) {
  res.send(`<form method="POST" enctype="multipart/form-data" action="monupload">
  <input type="file" name="mesfichiers" accept="image/png" multiple="multiple" >
  <button> envoyer </button>
  </form>`)
})

router.post('/monupload', upload.array('mesfichiers', 3), function (req, res) {
  //res.send(req.files)
  req.files.forEach(element => fs.rename(element.path, 'public/images/' + element.originalName, function(err){
    if (err) {
        res.send('problème durant le déplacement');
    } else {
        res.send('Fichier uploadé avec succès');
    }
  }));
})

module.exports = router;
