//TODO moving magic numbers to a different file
//TODO maybe we could create a larger function that handles differently
//role-to-level map used for authorization checks
import { ROLE_AUTH_LEVEL } from "#utils/magicNumberFile";

//checks if a logged-in user's role has enough permissions
export const getUserAuthorizationLevel = (req, res, next) => {
  next();
};

//checks if user's department is allowed for an endpoint
// export const authorizeByDepartment = (allowedDepartments = []) => {
//   return (req, res, next) => {
//     const userDepartment = normalizeValue(req.user?.userDepartmentName);
//     if (!userDepartment) {
//       return res.status(403).json({
//         success: false,
//         message: "Forbidden: department information is missing",
//       });
//     }

//     //if no specific departments are given, only the existence is validated
//     if (!allowedDepartments.length) return next();

//     const normalizedAllowedDepartments = allowedDepartments.map((department) =>
//       normalizeValue(department),
//     );

//     if (!normalizedAllowedDepartments.includes(userDepartment)) {
//       return res.status(403).json({
//         success: false,
//         message: "Forbidden: department is not allowed for this endpoint",
//       });
//     }

//     next();
//   };
// };

//combined authorization check for role-level and department
// export const authorizeByLevelAndDepartment = (
//   minimumLevel,
//   allowedDepartments = [],
// ) => {
//   return (req, res, next) => {
//     const roleName = normalizeValue(req.user?.userRoleName);
//     const userDepartment = normalizeValue(req.user?.userDepartmentName);
//     const userLevel = ROLE_AUTH_LEVEL[roleName] || 0;

//     if (!roleName || !userDepartment) {
//       return res.status(403).json({
//         success: false,
//         message: "Forbidden: role or department information is missing",
//       });
//     }

//     if (userLevel < minimumLevel) {
//       return res.status(403).json({
//         success: false,
//         message: "Forbidden: insufficient authorization level",
//       });
//     }

//     if (!allowedDepartments.length) return next();

//     const normalizedAllowedDepartments = allowedDepartments.map((department) =>
//       normalizeValue(department),
//     );

//     if (!normalizedAllowedDepartments.includes(userDepartment)) {
//       return res.status(403).json({
//         success: false,
//         message: "Forbidden: department is not allowed for this endpoint",
//       });
//     }

//     next();
//   };
// };
