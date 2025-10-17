import dotenv from "dotenv";

dotenv.config();

export function getEnv(argv) {
  let connectionString;

  console.log(argv);

  const env = argv.includes("dev") ? "dev" : "prod";

  if (env === "dev") {
    connectionString = process.env.DBDEV_CON;
  } else if (env === "prod") {
    connectionString = process.env.DBPROD_CON;
  }
  return { connectionString };
}
