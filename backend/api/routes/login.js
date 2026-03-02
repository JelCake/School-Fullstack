/**
 * This file is used for reaching each endpoint of the website
 */

// ! Imports
import { sendToken } from "../Utils/tokenHandler.js"; // remember the .js!
import express from "express";

const router = express.Router(); // Creates mini Express app
// ============================================
// MIDDLEWARE
// ============================================
router.get("/", (req, res) => {
  sendToken();
});

export default router; // Modern export
