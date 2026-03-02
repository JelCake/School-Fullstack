export const view = (fileName) => (req, res) => {
  // This goes UP out of backend and DOWN into frontend/html
  const filePath = path.join(
    root,
    "..",
    "..",
    "frontend",
    "html",
    `${fileName}.html`,
  );
  res.sendFile(filePath);
};

export default view;
