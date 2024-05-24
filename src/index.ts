import { MyDataSource } from "./myDataSource";
import app from "./app";

const port = process.env.PORT || 3000;

MyDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const server = app.listen(port, () => {
  console.log(
    `App running on port ${port}...`,
    JSON.stringify({
      service: "app",
      loggedFrom: "app.listen",
    })
  );
});
