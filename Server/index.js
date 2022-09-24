import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { collection, addDoc, getDocs, getDoc, doc, query, where, orderBy, deleteDoc } from "firebase/firestore";
import db from "./firebase-config.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import fileUpload from "express-fileupload";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.static("public"));

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

app.post("/register", async (req, res) => {
  try {
    const reference = await getDocs(collection(db, "users"));
    reference.docs.map((doc) => {
      if (req.body.email === doc.data().email) {
        throw { message: "Email already exists! use a different email", emailError: true, phoneError: false, nicError: false };
      } else if (req.body.phone === doc.data().phone) {
        throw { message: "Phone number already exists. Use a unique Phone number", emailError: false, phoneError: true, nicError: false };
      } else if (req.body.nic === doc.data().nic) {
        throw { message: "NIC no already Exists, Check the number again", emailError: false, phoneError: false, nicError: true };
      }
    });

    const docRef = await addDoc(collection(db, "users"), {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      nic: req.body.nic,
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
        if (doc.data().password === req.headers.password && doc.data().nic === req.headers.nic) {
          res.status(200).send({ access: "granted", userId: doc.id, admin: doc.data().admin });
        } else {
          throw { access: "denied", message: "Password or NIC not matched with the email", passwordError: true, emailError: false };
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
      nic: req.body.nic,
      password: req.body.password,
      position: req.body.position,
      admin: true,
    });

    res.status(201).send({ message: "done", userId: newDocument.id });
  } catch (error) {
    res.status(409).send(error);
  }
});

app.post("/addnews", async (req, res) => {
  if (req.files) {
    const storage = getStorage();
    const fileName = `images/jeniro_news_${Date.now()}_${req.files.cover.name}`;
    const storageRef = ref(storage, fileName);
    uploadBytesResumable(storageRef, req.files.cover.data, {
      contentType: "image/jpeg",
    })
      .then((response) => {
        if (response.state === "success") {
          getDownloadURL(storageRef).then((url) => {
            const docRef = addDoc(collection(db, "news"), {
              title: req.body.title,
              overview: req.body.overview,
              cover: url,
              content: req.body.content,
              authorId: req.body.authorId,
              time: Date.now(),
              fileName: fileName,
            });

            res.status(201).send({ message: "successfully added the News", error: false, docId: docRef.id });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(409).send("Error when uploading the image, try again");
      });
  } else {
    try {
      const docRef = await addDoc(collection(db, "news"), {
        title: req.body.title,
        overview: req.body.overview,
        cover: "",
        content: req.body.content,
        authorId: req.body.authorId,
        time: Date.now(),
        fileName: "",
      });

      res.status(201).send({ message: "successfully added the News", error: false, docId: docRef.id });
    } catch (error) {
      res.status(409).send({ message: "error occured", error });
    }
  }
});

//get news
app.get("/get-news", async (req, res) => {
  let data = [];
  try {
    const docsRef = await getDocs(query(collection(db, "news"), orderBy("time", "desc")));
    docsRef.docs.map((document) => {
      data.push({ data: document.data(), id: document.id });
    });
    res.status(200).send({ result: data });
  } catch (error) {
    res.status(409).send({ message: "An Error occured while fetching, Try again", error: error });
  }
});

//delete news
app.delete("/delete-news", async (req, res) => {
  const newsId = req.headers.newsid;
  try {
    const document = await getDoc(doc(db, "news", newsId));
    if (document.data().fileName) {
      const storage = getStorage();
      const file = ref(storage, document.data().fileName);
      deleteObject(file).then(() => {
        //done deleting the image
      });
    }

    const resultingDoc = doc(db, "news", newsId);
    await deleteDoc(resultingDoc);
    res.status(200).send({ message: "done" });
  } catch (error) {
    res.status(409).send({ message: "error occured", error });
  }
});
