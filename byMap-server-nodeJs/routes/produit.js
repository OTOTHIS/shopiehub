const router = require("express").Router();
const connection = require("../Config/connect_db");
const request = require('request');


router.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT id,title FROM products WHERE magazin_id = ?",
    [id],
    function (error, results, fields) {
      if (error) {
        console.error("Erreur lors de la récupération du produit:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération du produit" });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "Produit introuvable" });
      } else {
        res.json(results);
      }
    }
  );
});


router.get("/images/", (req, res) => {
  
  const imageUrl = "images/products/T4VzVakzIiE810NP50WxPneQbeSdsM1cSxth4gq2.jpg";

  // Proxy the request to the image server
  request.get("http://127.0.0.1:8000/storage/"+req.query.id).pipe(res);
});




router.get("/api/products/:id/product", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT p.* , c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = ?",
    [id],
    function (error, results, fields) {
      if (error) {
        console.error("Erreur lors de la récupération du produit:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération du produit" });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "Produit introuvable" });
      } else {
        res.json(results[0]);
      }
    }
  );
});



router.post('/api/incrementViews', (req, res) => {
  const { productId } = req.body;

  connection.query(
    'UPDATE products SET views = views + 1 WHERE id = ?',
    [productId],
    (err, results) => {
      if (err) {
        console.error('Error incrementing views: ' + err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(200).json({ message: 'Views incremented successfully' });
    }
  );
});






router.get("/api/Allproducts", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT p.* , c.name as category FROM products p JOIN categories c ON p.category_id = c.id;",
    [id],
    function (error, results, fields) {
      if (error) {
        console.error("Erreur lors de la récupération du produit:", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération du produit" });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "Produit introuvable" });
      } else {
        res.json(results);
      }
    }
  );
});





// Fetch all produits
router.get("/api/products", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 2; // Set your preferred page size

  const offset = (page - 1) * pageSize;

  try {
    if (req.query.categories) {
      // If categories are specified in the query parameters
      const results = await queryWithPagination(
        "SELECT * FROM `products` WHERE category_id IN (?) LIMIT ? OFFSET ?",
        [req.query.categories, pageSize, offset]
      );

      res.json(results);
    } 
    
   else if (req.query.sort) {
      // If categories are specified in the query parameters
          if(req.query.sort == "new") {
            const results = await queryWithPagination(
              "SELECT * FROM `products` ORDER by created_at desc LIMIT ? OFFSET ?",
              [pageSize, offset]
            );
            res.json(results);
          }
         else if(req.query.sort == "desc") {
            const results = await queryWithPagination(
              "SELECT * FROM `products` ORDER by price desc LIMIT ? OFFSET ?",
              [pageSize, offset]
            );
            res.json(results);
          }

          else {
            const results = await queryWithPagination(
              "SELECT * FROM `products` ORDER by price asc LIMIT ? OFFSET ?",
              [pageSize, offset]
            );
            res.json(results);
          }

   
    }

    
    else {
      // If no categories are specified, retrieve all products
      const results = await queryWithPagination("SELECT * FROM products LIMIT ? OFFSET ?", [pageSize, offset]);

      res.json(results);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des produits" });
  }
});

router.get("/api/categories", (req, res) => {
  // Removed unnecessary slash from the route
  connection.query("SELECT id , name FROM categories", function (error, results, fields) {
    if (error) {
      console.error("Erreur lors de la récupération des categories:", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des categories" });
      return;
    }
    res.json(results);
  });
});

router.get("/api/subcategories", (req, res) => {
  // Removed unnecessary slash from the route
  connection.query("SELECT id , name FROM subcategories;", function (error, results, fields) {
    if (error) {
      console.error("Erreur lors de la récupération des subcategories:", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des subcategories" });
      return;
    }
    res.json(results);
  });
});

// SELECT id , name FROM categories;




// Helper function to execute SQL query with pagination
function queryWithPagination(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, function (error, results, fields) {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}



module.exports = router;
