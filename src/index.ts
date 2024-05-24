import { MyDataSource } from "./myDataSource";
import app from "./app";

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(
    `App running on port ${port}...`,
    JSON.stringify({
      service: "app",
      loggedFrom: "app.listen",
    })
  );
});
