const router = require("express").Router();
const connection = require("../Config/connect_db");

router.get("/api/totalPrice/:id", (req, res) => {
  const query = `SELECT
     o.id,
     SUM(CASE WHEN o.type = '+' THEN o.qte * p.price ELSE -o.qte * p.price END) AS total_sum
   FROM
     operations o
   JOIN
     products p ON o.product_id = p.id
     WHERE o.magazin_id = ?
   GROUP BY
      o.id;;
      `;
  // Removed unnecessary slash from the route
  connection.query(query, [req.params.id], function (error, results, fields) {
    if (error) {
      console.error("Erreur lors de la récupération des produits:", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des produits" });
      return;
    }
    res.json(results);
  });
});


router.get("/api/totalProd/:id/:type", (req, res) => {
    const {id , type} = req.params


    const query = 
    `SELECT COUNT(product_id) as prod_Vendu FROM operations WHERE type = ? AND magazin_id =? ;
        `;
    // Removed unnecessary slash from the route
    connection.query(query, [type ,id ], function (error, results, fields) {
      if (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération des produits" });
        return;
      }
      res.json(results[0]);
    });
  });




module.exports = router;
