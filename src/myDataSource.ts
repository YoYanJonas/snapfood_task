import "reflect-metadata";
import { DataSource } from "typeorm";

const { DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } =
  process.env;

export const MyDataSource = new DataSource({
  type: "mysql",
  host: "db",
  port: (DATABASE_PORT as any) || 3306,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  timezone: "Z",
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.ts"],
});
