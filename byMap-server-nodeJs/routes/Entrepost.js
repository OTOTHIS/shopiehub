
const router = require('express').Router()
const connection = require('../Config/connect_db')





router.get('/api/magazin/:id', (req, res) => {
  
    const { id } = req.params;
    connection.query('SELECT id,name FROM magazins WHERE owner_id = ?', [id], function (error, results, fields) {
      if (error) {
        console.error('Erreur lors de la récupération de l\'entrepôt:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'entrepôt' });
        return;
      }
      res.json(results);
    });


  });

  router.get('/api/user/:email', (req, res) => {
  
    const { email } = req.params;
    connection.query('SELECT * from owners where email = ?', [email], function (error, results, fields) {
      if (error) {
        console.error('Erreur lors de la récupération de l\'entrepôt:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'entrepôt' });
        return;
      }
      res.json(results[0]);
    });


  });


  
  module.exports = router