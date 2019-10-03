// Importacion de rutas
const { Router } = require('express')
const router = Router();
const admin = require('firebase-admin')
//Key de google
const key = require('../../key.json')
//Inicializar firebase
admin.initializeApp( {
    credential: admin.credential.cert(key),
    databaseURL: 'https://fir-node-contact.firebaseio.com/'
})
//conecta la bbdd
const db = admin.database()

// Definimos get
router.get('/', (req,res) => {
    //Cuando conectes con el /, recibe los valores de la coleccion contactos
    db.ref('contacts').once('value', (snapshot) =>{
        const data = snapshot.val()
        res.render('index',{contacts: data})
    })
    //al renderizar añadimos el objeto data
})

// definimos post para el formulario
router.post('/new-contact', (req,res) => {
    const newContact = {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
       // phone : req.body.phone
    }
    console.log(req.body)
    db.ref('contacts').push(newContact)
    res.redirect('/')
})

// Ruta de borrado
router.get('/delete-contact/:id', (req,res) => {  
    // imporante usar el params del req get enviado para borrar el dato en firebase
  db.ref('contacts/'+ req.params.id).remove();
  res.redirect('/')
})

module.exports = router