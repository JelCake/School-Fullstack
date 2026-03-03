// file has to do with getting all types of info that is related to users
import { prisma } from "#utils/prismaClient";
// import {bcrypt} from bcrypt;

// Example: Fetch all records from a table
// Replace 'user' with your actual model name
async function exampleFunction(userId) {
  const allUsers = await prisma.users.findUnique({
    where: {
      userId: userId,
    },
    select: {
      userId: true,
      firstName: true,
      lastName: true,
      role: {
        select: {
          roleName: true,
        },
      },
      department: {
        select: {
          departmentName: true,
        },
      },
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

// * Actual funcs

//!A way to get the data from the DB so you can COMPARE it with what the user send during LOGIN
/**
 * uses @param - userEmail, providedPassword  to get the user password info, and also validates if the login password is correct
 * @returns an object?
 */
export async function validateUserLogin(userEmail, providedPassword) {
  const user = await prisma.users.findUnique({
    where: { email: userEmail },
    select: { userId: true, saltedPassword: true, salt: true },
  });

  //validates if the user exist
  if (!user) return { success: false, message: "User Doesn't Exist" };

  //Salts that password so we can actually validate itt with the stored password
  const saltedProvidedPassword = await bcrypt.hash(providedPassword, user.salt);

  //validates the password
  if (!user.saltedPassword === saltedProvidedPassword)
    return { success: false, message: "Incorrect email or password" };

  //returns if sucessfull
  return { success: true, message: "Logged in", userId: user.userId };
}

//get the info of a user from an object like {userId: something} to get userId, userRole, userDepartment
/**
 * ! seems a bit sketchy to hold the userId in this
 * @param {*} userInfo
 * @returns
 */
export async function fetchUserInfo(userInfo) {
  const Info = await prisma.users.findUnique({
    where: {
      userId: userInfo.userId,
    },
    select: {
      userId: true,
      role: {
        select: { roleName: true },
      },
      department: {
        select: {
          departmentName: true,
        },
      },
    },
  });
  console.log(userInfo);
  return userInfo;
}

fetchUserInfo({ userId: "f" });
