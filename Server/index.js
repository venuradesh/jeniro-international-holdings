import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { collection, addDoc, getDocs, getDoc, doc, query, where } from "firebase/firestore";
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

app.get("/login", async (req, res) => {
  try {
    const collectionRef = collection(db, "users");
    const result = query(collectionRef, where("email", "==", req.headers.email));
    const querySnapShot = await getDocs(result);
    if (querySnapShot.docs.length === 0) {
      throw { access: "denied", message: "Email doesn't exists", passwordError: false, emailError: true };
    } else {
      querySnapShot.docs.map((doc) => {
        if (doc.data().password === req.headers.password) {
          res.status(200).send({ access: "granted", userId: doc.id, admin: doc.data().admin });
        } else {
          throw { access: "denied", message: "Password not matched with email", passwordError: true, emailError: false };
        }
      });
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

app.post("/admin-registration", async (req, res) => {
  try {
    const reference = await getDocs(collection(db, "users"));
    reference.docs.map((doc) => {
      if (req.body.email === doc.data().email) {
        throw { message: "Email already exists", emailError: true, phoneError: false };
      } else if (req.body.phone === doc.data().phone) {
        throw { message: "Phone number already exists", emailError: false, phoneError: true };
      }
    });

    const newDocument = await addDoc(collection(db, "users"), {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      position: req.body.position,
      admin: true,
    });

    res.status(201).send({ message: "done", userId: newDocument.id });
  } catch (error) {
    res.status(409).send(error);
  }
});
