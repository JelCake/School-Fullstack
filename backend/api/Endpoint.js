/**
 * 
*/

//req
const express = require("../modules/node_modules/express");
const endpointAPI = express();
const PORT = 443;

endpointAPI.get("/", (req, res) => {
  res.send(
    'Welkom to API. The API has the following routes:\n\nGET "/product"\nGET "/products/:id\nPOST "/products\nDELETE "/products/:id\nPATCH "/prodcuts/:id\nGET "/category?category=category',
  );
});

// listens to ports
endpointAPI.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
  console.log("Druk Ctrl+C om de server te stoppen");
});