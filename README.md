Backend folder def

    config/: Stores configuration files for third-party services, databases, or environment variable mappings.
    Rule: Keep connection logic (e.g., connecting to MongoDB or Postgres) isolated here.

    models/: Defines the data structures and database schemas.
    Rule: Only database-related logic (like Mongoose schemas or Sequelize models) belongs here.

    routes/: Maps URL endpoints (like /api/users) to specific controller functions.
    Rule: Do not write business logic here. This folder should purely act as a traffic director.

    controllers/: Contains the logic for what happens when a route is hit. It processes incoming requests, interacts with models, and sends back responses.
    Rule: Controllers should be "thin". If a process is highly complex, extract it into a separate services/ folder.

    middlewares/: Functions that run between receiving a request and hitting the controller (e.g., user authentication, error handling, logging).
    Rule: Middleware should be generic and reusable across multiple routes.

    utils/ (or helpers/): Small, reusable, pure functions (e.g., date formatters, random string generators, password hashers).
    Rule: Functions here should not rely on the database or external APIs.

    server.js: Initializes the framework (like Express), registers global middleware, and mounts the routes.
    It listen on a specific port (e.g., app.listen(3000)).

Frontend folder def

    placeholder
