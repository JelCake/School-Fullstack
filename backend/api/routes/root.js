// ! Imports
import express from "express";

const router = express.Router(); //

// 1. Just sending a static "Hello"
router.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

export default router;
