import express from "express";
import { getPatient, getPatients, createPatient } from "../controller/patient.controller.js"

const patientsRoute = express.Router();
patientsRoute.route("/")
  .get(getPatients)
  .post(createPatient);

patientsRoute.route("/:id")
  .get(getPatient)

export default patientsRoute;
