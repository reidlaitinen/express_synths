var express = require('express');
var router = express.Router();
var Synth = require('../models').Synth;

/* GET all synths */
router.get('/', function(req, res, next) {
  Synth.all()
    .then(function(synths) {
      return res.render('synths', {synths: synths})
    })
});

/* POST add synth */
router.post('/', function(req, res) {
  var name = req.body.name;
  var description = req.body.description;
  var price = req.body.price;
  Synth.create({ name: name, description: description, price: price })
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

module.exports = router;