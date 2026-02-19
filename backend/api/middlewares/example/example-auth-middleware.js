export const validateRegistration = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password too short" });
  }

  next(); // "Everything is fine, move to the next function"
};
