import express from "express";
import multer from "multer";
import mime from "mime-types";
import fs from "fs";
import * as csv from "fast-csv";
import path from "path";

import IDoctor from "./models/doctor";
import IDoctorCSV from "./models/doctorCSV";
import IDoctorFacility from "./models/doctorFacility";
import IAuthenticationData from "./models/authenticationData";
import verifyToken from "./utils/verifyToken";

const PORT = 9999;

const app = express();

// Parse JSON bodies sent by API clients
app.use(express.json());

// Set in-memory doctors ids
let doctorsIds: string[] = [];

// CSV file storage
const upload = multer({ dest: "./uploads" });

app.get("/", (req, res) => {
  res.send("Healthcare App");
});

app.post("/", verifyToken, upload.single("file"), (req: any, res) => {
  const authenticationData: IAuthenticationData = JSON.parse(
    Buffer.from(req.token, "base64").toString()
  );

  if (
    !authenticationData.roles.includes("Admin") &&
    !authenticationData.roles.includes("Practitioner")
  ) {
    console.log("Unauthorized user role!");
    // Unauthorized
    res.sendStatus(401);
  } else {
    if (req.is("json") || req.is("*/json")) {
      const doctor: IDoctor = req.body;

      if (doctorsIds.includes(doctor.id)) {
        console.log("===> Error: Doctor id must be unique!");
        // Forbidden
        res.sendStatus(403);
      } else if (!doctor.id) {
        console.log("===> Error: Missing id!");
        // Bad Request
        res.sendStatus(400);
      } else if (doctor.resourceType !== "Practitioner") {
        console.log("===> Error: Doctor resourceType must be Practitioner!");
        doctorsIds.push(doctor.id);
        res.sendStatus(400);
      } else if (doctor.active) {
        console.log("===> name");
        console.log(doctor.name[0].text);
        console.log("===> facility");
        doctor.facility.forEach((item) => {
          if (authenticationData.facility.includes(item.value)) {
            console.log(item.name);
          }
        });
        doctorsIds.push(doctor.id);
        // Created
        res.sendStatus(201);
      }
    } else {
      if (req.file !== undefined) {
        // Remove end of mime.contentType string regarding 'utf' details
        const mimeType: string | false = mime
          .contentType(req.file.mimetype)
          .toString()
          .substring(0, 8);

        if (mimeType === "text/csv") {
          let fileRows: IDoctorCSV[] = [];

          // Open uploaded CSV file
          fs.createReadStream(path.resolve(req.file.path))
            .pipe(csv.parse({ headers: true }))
            .on("error", (error) => console.error(error))
            .on("data", (data: any) => {
              const temp: IDoctorCSV = <IDoctorCSV>{
                id: +data.ID,
                familyName: data[" FamilyName"].substring(1),
                givenName: data[" GivenName"].substring(1),
                facilityId: data[" FacilityId"].substring(1),
                systemId: data[" SystemId"].substring(1),
                nameId: data[" NameId"].substring(1),
                active: data[" Active"] === " true" ? true : false,
              };
              if (
                fileRows.findIndex(
                  (doctor) =>
                    doctor.id === temp.id &&
                    doctor.familyName !== temp.familyName
                ) !== -1
              ) {
                console.log("===> Error: Different names for the same id are not allowed!");
              }
              // Add each row
              fileRows.push(temp);
            })
            .on("end", function () {
              // Remove temp file
              fs.unlinkSync(req.file.path);
              // Process file rows
              let doctorFacility: IDoctorFacility[] = [];
              fileRows.forEach((row: IDoctorCSV) => {
                if (row.active) {
                  const doctorIndex: number = doctorFacility.findIndex(
                    (doctor) => doctor.id === row.id
                  );
                  if (doctorIndex !== -1) {
                    if (authenticationData.facility.includes(row.facilityId)) {
                      doctorFacility[doctorIndex].facilityNameId.push(
                        row.nameId
                      );
                    }
                  } else {
                    if (authenticationData.facility.includes(row.facilityId)) {
                      let hospital: string[] = [];
                      hospital.push(row.nameId);
                      const tempMedicFacility: IDoctorFacility = <
                        IDoctorFacility
                      >{
                        id: row.id,
                        familyName: row.familyName,
                        givenName: row.givenName,
                        facilityNameId: hospital,
                      };
                      doctorFacility.push(tempMedicFacility);
                    }
                  }
                }
              });
              console.log("===> Active doctors in hospitals");
              doctorFacility.forEach((item) => {
                console.log(
                  `${item.familyName} ${item.givenName}: ${item.facilityNameId}`
                );
              });
            });

          res.sendStatus(201);
        } else {
          // No Content
          res.sendStatus(204);
        }
      } else {
        res.sendStatus(204);
      }
    }
  }
});

app.listen(PORT, () => console.log(`===> Server running on port: ${PORT}`));
