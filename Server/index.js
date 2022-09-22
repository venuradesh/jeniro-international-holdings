import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import db from "./firebase-config.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

app.post("/register", async (req, res) => {
  try {
    const reference = await getDocs(collection(db, "users"));
    reference.docs.map((doc) => {
      if (req.body.email === doc.data().email) {
        throw { message: "Email already exists! use a different email", emailError: true, phoneError: false };
      } else if (req.body.phone === doc.data().phone) {
        throw { message: "Phone number already exists. Use a unique Phone number", emailError: false, phoneError: true };
      }
    });

    const docRef = await addDoc(collection(db, "users"), {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      jobTypes: req.body.jobTypes,
      education: req.body.qualifications,
      professionalQualifications: req.body.professionalQualifications,
      admin: false,
    });

    console.log(docRef.id);
    res.status(201).send({ message: "done", userId: docRef.id });
  } catch (e) {
    console.error("Error adding document: ", e);
    res.status(409).send(e);
  }
});

app.get("/getUser", async (req, res) => {
  const userId = req.headers.userid;
  try {
    const docRef = doc(db, "users", userId);
    const dataSanp = await getDoc(docRef);
    if (dataSanp.exists()) {
      res.status(200).send({ userData: dataSanp.data() });
    } else {
      res.status(404).send({ message: "no user found" });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
});
