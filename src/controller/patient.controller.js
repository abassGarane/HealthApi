import pool from "../config/mysql.config.js";
import Response from "../domain/Response.js";
import log from "../util/logger.js";
import {QUERY} from "../query/patient.query.js";
import httpStatus from "../util/httpStatus.js";

export const getPatients = (req, res) => {
  log.info(`${req.method} ${req.originalUrl} fetching petients`);
  pool.query(QUERY.SELECT_PATIENTS, (err, result) => {
    if (!result) {
      log.error(err.message);
      res
        .status(httpStatus.NO_CONTENT.code)
        .send(
          new Response(
            httpStatus.NO_CONTENT.code,
            httpStatus.NO_CONTENT.status,
            "No content found"
          )
        );
    } else {
      res.status(httpStatus.OK.code).send(
        new Response(
          httpStatus.OK.code,
          httpStatus.OK.status,
          "patients retieved",
          {
            patients: result,
          }
        )
      );
    }
  });
};
export const createPatient = (req, res) => {
  log.info(`${req.method} ${req.originalUrl} creating petients`);
  pool.query(QUERY.CREATE_PATIENTS, Object.values(req.body), (err, result) => {
    if (!result) {
      log.error(err.message);
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR.code)
        .send(
          new Response(
            httpStatus.INTERNAL_SERVER_ERROR.code,
            httpStatus.INTERNAL_SERVER_ERROR.status,
            "ERROR CREATING PATIENT"
          )
        );
    } else {
      const patient = {
        id: result.insertedId,
        ...req.body,
        created_at: new Date(),
      };
      res.status(httpStatus.CREATED.code).send(
        new Response(
          httpStatus.CREATED.code,
          httpStatus.CREATED.status,
          "patients created",
          {
            patient,
          }
        )
      );
    }
  });
};
export const getPatient = (req, res) => {
    log.info(`${req.method} ${req.originalUrl} getting petient`);
    pool.query(QUERY.SELECT_PATIENT,[req.params.id], (err, result) => {
      if (!result[0]) {
        log.error(err.message);
        res
          .status(httpStatus.NOT_FOUND.code)
          .send(
            new Response(
              httpStatus.NOT_FOUND.code,
              httpStatus.NOT_FOUND.status,
              `Error fetching patient with id : ${req.params.id}`
            )
          );
      } else {
        res.status(httpStatus.CREATED.code).send(
          new Response(
            httpStatus.CREATED.code,
            httpStatus.CREATED.status,
            "patients retrieved",
            result[0],
          )
        );
      }
    });
  };