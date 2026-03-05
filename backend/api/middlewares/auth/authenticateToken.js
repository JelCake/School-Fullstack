import { processToken } from "#services/tokenHandler";
import { prisma } from "#utils/prismaClient";

//checks if the request has a token and if the token is still valid
export const authenticateToken = async (req, res, next) => {
  //takes in a JWT non mobile token
  const cookieToken = req.cookies?.token;

  //Checks if a token is found
  if (!cookieToken) return res.redirect("/login?error=denied");

  //verifies token and decodes payload
  const processedToken = processToken(cookieToken.token);

  //4. Bad token? Clear it and EXIT then reroutes.
  if (!processedToken.success) {
    res.clearCookie("token");
    return res.redirect("/login?error=denied");
  }

  //Checks if the user is still active in the db, so no bans or such
  const user = await prisma.users
    .findUnique({
      where: {
        userId: processedToken.tokenInfo.userId,
      },
      select: {
        isActive: true,
        role: { select: { roleName: true } },
        department: { select: { departmentName: true } },
      },
    })
    .catch((err) => {
      // This will show exactly where it failed in your logs
      err.message = `[Auth DB Check Failed]: ${err.message}`;
      throw err;
    });

  // 1. Define the "Kick Out" logic once
  const kickOut = () => {
    res.clearCookie("token", { path: "/" });
    return res.redirect("/login?error=denied");
  };

  // 2. Run the checks
  const isDeactivated = !user || !user.isActive;
  const roleMismatch =
    processedToken.tokenInfo.userRoleName !== user.role.roleName;
  const deptMismatch =
    processedToken.tokenInfo.userDepartmentName !==
    user.department.departmentName;

  if (isDeactivated || roleMismatch || deptMismatch) {
    return kickOut();
  }

  //attachsss token payload for authorization middleware
  req.tokenInformation = processedToken.tokenInfo;
  next();
};

// TODO Actually have a way to autoredirect the user to dashboarrd if they acutally have a valid JWT Token
export const isGuest = (req, res, next) => {
  if (req.cookies && req.cookies.authToken) {
    return res.redirect("/dashboard"); // Kick to dashboard
  }
  next(); // No token? Carry on to the Login screen.
};
