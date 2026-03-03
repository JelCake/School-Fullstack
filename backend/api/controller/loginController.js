import { fetchUserInfo, validateUserLogin } from "#services/fetchUserInfo";
import { generateToken } from "#services/tokenHandler";

//validates if the user login information is correct
const validateLogin = async (req, res) => {
  //what i want to get out of the body of the req.body
  const { userRole, userEmail, providedPassword } = req.body;

  //checks if there is actually a password or email send
  if (!userEmail || !providedPassword) {
    return res
      .status(400)
      .json({ message: "You have to put email or password" });
  }
  //validates that the user is giving the correct role, password, and
  const userLogin = await validateUserLogin(
    userRole,
    userEmail,
    providedPassword,
  );

  if (!userLogin.success) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const userInfo = await fetchUserInfo(userLogin.userId);
  const token = generateToken(
    userInfo.userId,
    userInfo.roleName,
    userInfo.departmentName,
  );

  // * Make the client browser kill/delete the received token?
  //   const ONE_HOUR = 1 * 60 * 60 * 1000;
  //   const cookieOptions = {
  //     maxAge: ONE_HOUR, // Automatically calculates the Date for you
  // httpOnly: true,    // Essential for security
  // sameSite: "strict", // Essential for security
  // secure: process.env.NODE_ENV === "production", // Only HTTPS in prod
  //   };
};
