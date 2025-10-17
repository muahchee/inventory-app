import e, { urlencoded } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { indexRouter } from "./routes/indexRouter";

const app = e();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsPath = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(e.static(assetsPath));
app.use(urlencoded({ extended: true }));

app.use("/", indexRouter);


app.listen(PORT, (err) => {
  if (err) throw err;
  cosnsole.log(`Listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
