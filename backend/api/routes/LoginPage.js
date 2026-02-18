/**
 * This file is used for reaching each endpoint of the website
 */

//login screen
server.get("/login-page", (req, res) => {
  res.send(
    'Welkom to API. The API has the following routes:\n\nGET "/product"\nGET "/products/:id\nPOST "/products\nDELETE "/products/:id\nPATCH "/prodcuts/:id\nGET "/category?category=category',
  );
});
