import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import ip from "ip";
import Response from "./domain/Response.js";
import patientsRoute from "./routes/patient.route.js";
import httpStatus from "./util/httpStatus.js";
import log from "./util/logger.js";

dotenv.config();
const PORT = process.env.SERVER_PORT || 5000;
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/patients",patientsRoute);
app.get("/", (req, res) => {
  res.send(
    new Response(
      httpStatus.OK.code,
      httpStatus.OK.status,
      "First dockerised app",
      { patients: { name: "abass" } }
    )
  );
});

console.log(process.env);

app.listen(PORT, () => {
  log.info(`Server running on ${ip.address()}:${PORT}`);
});
