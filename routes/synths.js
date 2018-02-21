var express = require('express');
var router = express.Router();
var Synth = require('../models').Synth;

/* GET all synths */
router.get('/', function(req, res, next) {
  Synth.all({
    order: [
      ['createdAt', 'ASC']
    ]
  })
    .then(function(synths) {
      return res.render('synths', {synths: synths})
    })
});

/* POST add synth */
router.post('/', function(req, res) {
  var name = req.body.name;
  var manufacturer = req.body.manufacturer;
  var price = req.body.price;
  Synth.create({ name: name, manufacturer: manufacturer, price: price })
    .then( function() {
      res.redirect('/synths');
  });
});

/* DELETE delete synth */
router.delete('/:id', function(req, res) {
  Synth.findById(req.params.id)
    .then( function(synth) { synth.destroy() })
    .then( function() { return res.redirect('/synths') })
  
})

/* GET edit page for specific synth */
router.get('/:id/edit', function(req, res) {
  Synth.findById(req.params.id)
    .then( function(synth) {
      return res.render('edit', { synth: synth });
  });
});

/* PUT edit a synth */
router.put('/:id', function(req, res) {
  Synth.update(
    { name: req.body.name,
      manufacturer: req.body.manufacturer,
      price: req.body.price },
    { where: { id: req.params.id } }
  )
  .then( function() {
    return res.redirect('/synths');
  })
});

module.exports = router;