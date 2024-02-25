const router = require("express").Router();
const connection = require("../Config/connect_db");


function formatCurrentDate() {
  const currentDate = new Date(Date.now());

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

router.get("/operation",(req,res)=> {
  return res.json({msg:"heeloowrld"})
})
/****************************************************************************/
router.post("/api/Facture", (req, res) => {
  const operationsArray = req.body;

  if (!Array.isArray(operationsArray) || operationsArray.length === 0) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  // Get the maximum id_operation from the existing data
  connection.query(
    "SELECT MAX(id) AS max_id FROM operations",
    (error, maxResult) => {
      if (error) {
        console.log("Error getting max id_operation:", error);
        return res
          .status(500)
          .json({ error: "Failed to get the maximum id_operation" });
      }

      const maxIdOperation = maxResult[0].max_id + 1;

      const insertOperation = (operation, id_operation) => {
        const { type, qte, magazin_id, product_id, created_at, updated_at } = operation;
                                                                          


            const operationData = {
              id:id_operation, // Use the specified id_operation
              type,
              qte,
              magazin_id,
              product_id,
              created_at:formatCurrentDate(),
              updated_at:formatCurrentDate(),
            };

            connection.query(
              "INSERT INTO `operations` SET ? ",
              operationData,
              function (error, results, fields) {
                if (error) {
                  console.error("Error saving operation:", error);
                  return res
                    .status(500)
                    .json({ error: "Failed to save the operation" });
                }
                // Continue inserting the next operation if available
                insertNextOperation();
              }
            );
          }
        
      

      let currentIndex = 0;

      const insertNextOperation = () => {
        if (currentIndex < operationsArray.length) {
          const operation = operationsArray[currentIndex];
          const id_operation = maxIdOperation;
          insertOperation(operation, id_operation);
          currentIndex++;
        } else {
          res.json({ message: "Operations ajoutées avec succès" });
        }
      };

      // Start inserting the first operation
      insertNextOperation();
    }
  );
});



/****************************************************************************/

router.get("/facture/:idEntropot", (req, res) => {
  const { idEntropot } = req.params;
  connection.query(
    "SELECT * FROM `operations` WHERE ?",
    [idEntropot],
    function (error, results, fields) {
      if (error) {
        console.error("Erreur lors de la récupération de l'entrepôt:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'entrepôt" });
        return;
      }
      res.json(results);
    }
  );
});
router.get("/api/factures/nombres/:id", (req, res) => {

  connection.query(
    "SELECT COUNT(DISTINCT id) as nombre FROM operations WHERE magazin_id = ?",
    [req.params.id],
    function (error, results, fields) {
      if (error) {
  
        res
          .status(500)
          .json({ error: "Erreur lors de la count " });
        return;
      }
      res.json(results[0]);
    }
  );
});




router.get("/facture/entre/:idEntrepot", (req, res) => {
  const { idEntrepot } = req.params;
  connection.query(
    "SELECT id_operation, type, MAX(created_at) AS created_at FROM operations WHERE magazin_id = ?  GROUP BY id_operation, type;",
    [idEntrepot],
    function (error, results, fields) {
      if (error) {
        console.error("Erreur lors de la récupération de l'entrepôt:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'entrepôt" });
        return;
      }
      res.json(results);
    }
  );
});
router.get("/facture/facteur/:idEntrepot/:idoperation", (req, res) => {
  const { idEntrepot, idoperation } = req.params;
  connection.query(
    "SELECT o.*, e.*, p.* FROM operations o JOIN entrepots e ON o.magazin_id = e.id JOIN produits p ON o.id_produit = p.id WHERE o.magazin_id = ? AND o.id_operation = ?;",
    [idEntrepot, idoperation],
    function (error, results, fields) {
      if (error) {
        console.error("Erreur lors de la récupération de l'entrepôt:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'entrepôt" });
        return;
      }
      res.json(results);
    }
  );
});

router.get("/facture/entre/:idEntrepot/:type", (req, res) => {
  const { idEntrepot, type } = req.params;

  const query = `
    SELECT id_operation, type, MAX(created_at) AS created_at
    FROM operations
    WHERE magazin_id = ? AND type = ?
    GROUP BY id_operation, type;
  `;

  connection.query(
    query,
    [idEntrepot, type],
    function (error, results, fields) {
      if (error) {
        console.error("Erreur lors de la récupération de l'entrepôt:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'entrepôt" });
        return;
      }
      res.json(results);
    }
  );
});



/*******************************************    facture   sortie    */

router.get("/api/facture/sortie/:idEntrepot", (req, res) => {
  const { idEntrepot } = req.params;

  const query = `
  SELECT id, sum(qte) AS qte , MAX(created_at) as created_at
  FROM operations WHERE type = '+' AND magazin_id = ?
  GROUP BY id;
  `;

  connection.query(
    query,
    [idEntrepot],
    function (error, results, fields) {
      if (error) {
        console.error("Erreur lors de la récupération de l'entrepôt:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'entrepôt" });
        return;
      }
      res.json(results);
    }
  );
});


/****************************************************************************************************** */
router.get("/api/facture/entre/:idEntrepot", (req, res) => {
  const { idEntrepot } = req.params;

  const query = `
  SELECT id, sum(qte) AS qte , MAX(created_at) as created_at
  FROM operations WHERE type = '-' AND magazin_id = ?
  GROUP BY id;
  `;

  connection.query(
    query,
    [idEntrepot],
    function (error, results, fields) {
      if (error) {
        console.error("Erreur lors de la récupération de l'entrepôt:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'entrepôt" });
        return;
      }
      res.json(results);
    }
  );
});


/**********************************************************///////////////////////////////////////////////////////////////* */

router.get("/sums/:id_produit/:idEntrepot", (req, res) => {
  const { id_produit, idEntrepot } = req.params;
  // Fetch the sum of qte where type is '+' and id_produit matches
  connection.query(
    'SELECT SUM(qte) AS sum_plus FROM operations WHERE type = "+" AND id_produit = ? AND magazin_id = ? ',
    [id_produit, idEntrepot],
    (err, resultsPlus) => {
      if (err) {
        console.error(
          'Error fetching sum of qte for type "+" and id_produit:',
          err
        );
        connection.end(); // Close the connection
        return res.status(500).json({ error: "Internal server error" });
      }

      const sumPlus = resultsPlus[0].sum_plus || 0;

      // Fetch the sum of qte where type is '-' and id_produit matches
      connection.query(
        'SELECT SUM(qte) AS sum_minus FROM operations WHERE type = "-" AND id_produit = ?  AND magazin_id = ? ',
        [id_produit, idEntrepot],
        (err, resultsMinus) => {
          if (err) {
            console.error(
              'Error fetching sum of qte for type "-" and id_produit:',
              err
            );
            connection.end(); // Close the connection
            return res.status(500).json({ error: "Internal server error" });
          }

          const sumMinus = resultsMinus[0].sum_minus || 0;

          // Send the results as JSON response
          res.json({ sumPlus, sumMinus });
        }
      );
    }
  );
});



// SELECT
//   o.magazin_id, o.product_id, p.title,
//   SUM(CASE WHEN o.type = '+' THEN o.qte ELSE 0 END) AS sum_plus,
//   SUM(CASE WHEN o.type = '-' THEN o.qte ELSE 0 END) AS sum_minus
// FROM
//   operations o
//   LEFT JOIN products p ON p.id = o.product_id
// WHERE
//   o.magazin_id = 1 
// GROUP BY
//   o.magazin_id, o.product_id, p.title
//   ORDER by sum_plus desc
// LIMIT 0, 8;



router.get("/api/products/charts/:magazinId", (req, res) => {
  const { magazinId } = req.params;

  const query = `
  SELECT
  o.magazin_id, o.product_id, p.title,
  SUM(CASE WHEN o.type = '+' THEN o.qte ELSE 0 END) AS sum_plus,
  SUM(CASE WHEN o.type = '-' THEN o.qte ELSE 0 END) AS sum_minus
FROM
  operations o
  LEFT JOIN products p ON p.id = o.product_id
WHERE
  o.magazin_id = ? 
GROUP BY
  o.magazin_id, o.product_id, p.title
  ORDER by sum_plus desc
LIMIT 0, 8;
  `;

  connection.query(
    query,
    [magazinId],
    function (error, results, fields) {
      if (error) {
        console.error("Erreur lors de la récupération de l'entrepôt:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'entrepôt" });
        return;
      }
      res.json(results);
    }
  );
});


// sum for products

router.get("/api/operations/price/:magazinId", (req, res) => {
  const { magazinId } = req.params;

  const query = `
  SELECT
  o.id,o.product_id AS products,  o.created_at ,
  SUM(CASE WHEN o.type = '+' THEN o.qte * p.price ELSE -o.qte * p.price END) AS total_sum
FROM
  operations o
JOIN
  products p ON o.product_id = p.id
  WHERE o.magazin_id = ?
GROUP BY
  o.product_id , o.id , o.created_at 
  
  ORDER by o.created_at DESC
  LIMIT 6;
  `;

  connection.query(
    query,
    [magazinId],
    function (error, results, fields) {
      if (error) {
        console.error("Erreur lors de la récupération de l'entrepôt:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'entrepôt" });
        return;
      }
      res.json(results);
    }
  );
});



// SELECT
//   magazin_id,product_id,
//   SUM(CASE WHEN type = '+' THEN qte ELSE 0 END) AS sum_plus,
//   SUM(CASE WHEN type = '-' THEN qte ELSE 0 END) AS sum_minus
// FROM
//   operations
// WHERE
//   magazin_id = 1 AND product_id = 1
// GROUP BY
//   magazin_id , product_id;




router.get("/Facteur/qte/:idEntropot/:ref", (req, res) => {
  // Removed unnecessary slash from the route
  connection.query(
    query,
    [req.params.idEntropot],
    function (error, results, fields) {
      if (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération des produits" });
        return;
      }
      res.json(results);
    }
  );
});

router.get("/FacteurHome/:idEntropot", (req, res) => {
  const query = `SELECT DISTINCT o1.id_operation, o1.type, o1.ART, o1.created_at FROM operations o1 INNER JOIN ( SELECT id_operation, MAX(created_at) AS max_created_at FROM operations WHERE magazin_id = ? AND type = '-' GROUP BY id_operation ) o2 ON o1.id_operation = o2.id_operation AND o1.created_at = o2.max_created_at ORDER BY o1.created_at DESC LIMIT 7;
    `;
  // Removed unnecessary slash from the route
  connection.query(
    query,
    [req.params.idEntropot],
    function (error, results, fields) {
      if (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération des produits" });
        return;
      }
      res.json(results);
    }
  );
});

router.get("/countoperations/:idEntropot", (req, res) => {
  // Removed unnecessary slash from the route
  connection.query(
    "SELECT COUNT(DISTINCT(id_operation)) as 'coutOperations' FROM `operations` WHERE magazin_id = ?",
    [req.params.idEntropot],
    function (error, results, fields) {
      if (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération des produits" });
        return;
      }
      res.json(results[0]);
    }
  );
});

router.get("/facteurs/:idEntropot/:idoperation", (req, res) => {
  const { idEntropot, idoperation } = req.params;

  connection.query(
    "SELECT * FROM `operations` WHERE magazin_id = ? AND  id_operation = ?",
    [idEntropot, idoperation],
    function (error, results, fields) {
      if (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération des produits" });
        return;
      }
      res.json(results);
    }
  );
});

router.put("/facteurs/:idEntropot/:idoperation", (req, res) => {
  const { idEntropot, idoperation } = req.params;
  const { qteArray, typeArray } = req.body; // Array of objects with qte and ref values

  // Function to update qte for a single item or insert if produit not found
  const updateQteOrInsertForItem = (item, callback) => {
    connection.query(
      "SELECT id FROM produits WHERE ref = ? AND magazin_id = ?",
      [item.produit_reference, idEntropot],
      function (error, results, fields) {
        if (error) {
          callback(error);
          return;
        }

        if (results.length === 0) {
          // Insert the produit into operations table
          connection.query(
            "INSERT INTO operations set ?",
            [idoperation, typeArray, item.qte, idEntropot, item.id_produit],
            function (error, results, fields) {
              callback(error);
            }
          );
        } else {
          const produitId = results[0].id;

          connection.query(
            "UPDATE operations SET qte = ? WHERE id_operation = ? AND produit_id = ? AND magazin_id = ?",
            [item.qte, idoperation, produitId, idEntropot],
            function (error, results, fields) {
              callback(error);
            }
          );
        }
      }
    );
  };

  // Update qte or insert for each item in the array
  const updateCallbacks = [];

  qteArray.forEach((item) => {
    updateCallbacks.push((callback) => {
      updateQteOrInsertForItem(item, (error) => {
        if (error) {
          callback(error);
        } else {
          callback(null);
        }
      });
    });
  });

  // Execute all update callbacks in series
  async.series(updateCallbacks, (error) => {
    if (error) {
      console.error("Error updating/inserting qte:", error);
      res.status(500).json({ error: "Error updating/inserting qte" });
    } else {
      res.json({ message: "qte updated/inserted successfully for all items" });
    }
  });
});

module.exports = router;
