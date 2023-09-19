const express = require("express");
const app = express(); // app express
const port = 5000; // port
const hostname = `localhost` || `127.0.0.1`; // hostname
const myGroupRouter = require("./routes/myGroupRouter");

app.use((req, res, next) => {
  const date = new Date();
  const time = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  console.log(`${req.method} ${req.url} ${time}`);
  next();
});
app.use(express.json());
app.use(myGroupRouter);

app.listen(port, hostname, () => {
  console.log(`Server listening on port ${port}!\nhttp://${hostname}:${port}`);
});
