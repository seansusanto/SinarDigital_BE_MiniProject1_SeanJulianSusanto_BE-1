const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const todoRoutes = require("./routes/todoRoutes");
app.use("/api", todoRoutes);

const pageRoutes = require("./routes/pageRoutes");
app.use("/", pageRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
