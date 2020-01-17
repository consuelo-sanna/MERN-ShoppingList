/*  qui sono presenti tutte le possibili "strade" e i comandi per
 *  get, post e delete
*/ 

const express = require('express');
const router = express.Router();

// Se voglio mettere l'autenticazione devo wrappare intorno ad auth post e del
const auth = require('../../middleware/auth');

// Item Model
/* creo una var che fa riferimento al modello del mio db */
 const Item = require('../../models/Item');

// @route  GET api/items
// @desc   GET All items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});



// @route  POST api/items
// @desc   Create A Item
// @access Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save()
        .then(item => res.json(item));

});

// @route  DELETE api/items/:id
// @desc   DELETE A Item
// @access Private
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success:false}));  
        
});


module.exports = router;