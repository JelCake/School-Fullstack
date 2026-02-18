const express = require("../modules/node_modules/express");

class serverStart {
  constructor(port = 443) {
    this.endpointAPI = express();
    this.PORT = port;
    this.endpointAPI.use(express.json());
  }

  start() {
    this.endpointAPI.listen(this.PORT, () => {
      console.log(`Server running on ${this.PORT}`);
    });
  }
}

// Export the class AND the express function
module.exports = { serverStart, express };
