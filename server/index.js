const express = require("express");
const app = express();
var cors = require("cors");
const authMiddleware = require("./middleware/auth-middleware");

app.use(express.json());
app.use(cors());
app.use("/", authMiddleware);

app.use("/api/products", require("./routes/product"));
app.use("/api/review", require("./routes/review"));

app.listen(5000, () => {
  console.log(`listening to port 5000`);
});
