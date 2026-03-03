import express, { type Application } from "express";
import { reportPothole, allPotholes } from "./controllers/pothole.controller";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded());

// Put the routes here !!

app.post("/api/potholes/report", reportPothole);
app.get("/api/potholes/report", allPotholes);

app.get("/", (_req, res) => {
  res.json({ message: "Backend Of Pothole Detection" });
});

export default app;
