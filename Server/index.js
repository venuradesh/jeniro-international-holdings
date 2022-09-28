import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { collection, addDoc, getDocs, getDoc, doc, query, where, orderBy, deleteDoc, updateDoc, limit } from "firebase/firestore";
import db from "./firebase-config.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject, connectStorageEmulator } from "firebase/storage";
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

/* **************************************************************************************** */
/* **************************************************************************************** */
/* User Routes */

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
      status: "Registered",
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

app.get("/getNormalUsers", async (req, res) => {
  const documentArray = [];
  try {
    const documents = await getDocs(query(collection(db, "users"), where("admin", "!=", true)));
    documents.docs.map((doc) => {
      documentArray.push({ data: doc.data(), id: doc.id });
    });

    res.status(200).send({ message: "success", userData: documentArray, error: false });
  } catch (error) {
    res.status(409).send({ message: "conflict occurs while fetching users", error: true });
  }
});

app.put("/updateStatus", (req, res) => {
  updateDoc(doc(db, "users", req.body.id), {
    status: req.body.status,
  })
    .then(() => {
      res.status(200).send({ message: "updated", error: false });
    })
    .catch((err) => {
      res.status(409).send({ message: "Error while updating", error: true, errMessage: err });
    });
});

app.get("/searchByNic", async (req, res) => {
  const nic = req.headers.nic;
  const results = [];
  try {
    const documents = await getDocs(query(collection(db, "users"), where("nic", "==", nic)));
    if (documents.docs.length !== 0) {
      documents.docs.map((doc) => {
        results.push({ data: doc.data(), id: doc.id });
      });

      res.status(200).send({ message: "found", userData: results, error: false });
    } else {
      res.status(409).send({ message: "not found", error: true });
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete("/deleteUser", async (req, res) => {
  const userid = req.headers.userid;
  try {
    const resultingDoc = doc(db, "users", userid);
    await deleteDoc(resultingDoc);
    res.status(202).send({ message: "successfully deleted", error: false });
  } catch (error) {
    res.status(400).send({ message: "error when deleting", error: true });
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

app.put("/updateUserInfo", async (req, res) => {
  const userid = req.body.userid;
  const oldPass = req.body.oldPassword;
  const newPass = req.body.newPassword;
  const email = req.body.email;
  const phone = req.body.phone;
  const result = {
    newPass: "",
    newEmail: "",
    newPhone: "",
  };

  try {
    const docRef = await getDoc(doc(db, "users", userid));
    if (oldPass) {
      if (docRef.data().password !== oldPass) {
        throw { message: "Current Password incorrect", error: true };
      } else {
        result.newPass = newPass;
      }
    } else {
      result.newPass = docRef.data().password;
    }

    if (email) {
      const usersDocuments = await getDocs(query(collection(db, "users"), where("email", "==", email)));
      if (usersDocuments.docs.length === 0) {
        result.newEmail = email;
      } else {
        throw { message: "Email already exists", error: true };
      }
    } else {
      result.newEmail = docRef.data().email;
    }

    if (phone) {
      const userDocuments = await getDocs(query(collection(db, "users"), where("phone", "==", phone)));
      if (userDocuments.docs.length === 0) {
        result.newPhone = phone;
      } else {
        throw { message: "Phone number already exists", error: true };
      }
    } else {
      result.newPhone = docRef.data().phone;
    }

    updateDoc(doc(db, "users", userid), {
      password: result.newPass,
      email: result.newEmail,
      phone: result.newPhone,
    })
      .then(() => {
        res.status(200).send({ message: "Successfully updated", error: false });
      })
      .catch((err) => {
        throw { message: "Error occurd", error: true, errorMessage: err };
      });
  } catch (error) {
    res.status(409).send(error);
  }
});

/* ************************************************************************************* */
/* ************************************************************************************* */
/* News Section */

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

//get latest 3 news
app.get("/getLatestNews", async (req, res) => {
  let data = [];
  try {
    const docsRef = await getDocs(collection(db, "news"), orderBy("time", "desc"), limit(3));
    docsRef.docs.map((doc) => {
      data.push({ data: doc.data(), id: doc.id });
    });

    res.status(200).send({ news: data, error: false, message: "Fetched" });
  } catch (error) {
    res.status(409).send({ message: "Conflict occurs while fetching news", error: true });
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

/* *********************************************************************** */
/* *********************************************************************** */
/* Job Section */

//adding job
app.post("/addjob", (req, res) => {
  console.log(req.files);
  const logoName = `jobCovers/jeniro_jobs_${Date.now()}_${req.files.jobCover.name}`;

  try {
    const storage = getStorage();
    const storageRef = ref(storage, logoName);
    uploadBytesResumable(storageRef, req.files.jobCover.data, {
      contentType: req.files.jobCover.mimetype,
    }).then((uploadStatus) => {
      if (uploadStatus.state === "success") {
        getDownloadURL(storageRef).then(async (url) => {
          const docRef = await addDoc(collection(db, "jobs"), {
            workLocation: req.body.workLocation,
            jobTitle: req.body.jobTitle,
            jobType: req.body.jobType,
            applicationDeadline: req.body.applicationDeadline,
            salary: req.body.salary,
            experience: req.body.experience,
            jobOverview: req.body.jobOverview,
            responsibilities: req.body.jobRes,
            requirements: req.body.jobReq,
            jobCreatedBy: req.body.jobCreateBy,
            logoPath: uploadStatus.metadata.fullPath,
            jobCover: url,
            jobCategroy: req.body.jobCategroy,
            createdOn: Date.now(),
          });

          res.status(201).send({ message: "successully added the job", docRef: docRef.id, error: false });
        });
      } else {
        throw { message: "Error occured while uploading the logo, Try again", error: true };
      }
    });
  } catch (error) {
    res.status(409).send(error);
  }
});

//getting jobs
app.get("/getJobs", async (req, res) => {
  const jobs = [];
  try {
    const snapDocs = await getDocs(query(collection(db, "jobs"), orderBy("createdOn", "desc")));
    snapDocs.docs.map((document) => {
      jobs.push({ jobDetails: document.data(), id: document.id });
    });
    res.status(200).send({ jobs: jobs, error: false });
  } catch (error) {
    res.status(400).send({ message: "Error occured while fetching the Jobs", error: true });
  }
});

//delete job
app.delete("/deleteJob", async (req, res) => {
  const jobid = req.headers.jobid;
  const logoPath = req.headers.filepath;

  try {
    const storage = getStorage();
    const file = ref(storage, logoPath);
    deleteObject(file).then(() => {
      // console.log("file deleted");
    });

    const resultingDoc = doc(db, "jobs", jobid);
    await deleteDoc(resultingDoc);
    res.status(202).send({ message: "successfully deleted", error: false });
  } catch (error) {
    res.status(409).send({ message: "conflict occurs", error: true });
  }
});

app.get("/job", async (req, res) => {
  const jobid = req.headers.jobid;

  try {
    const jobDetails = await getDoc(doc(db, "jobs", jobid));
    res.status(200).send({ message: "successfully fetched", jobData: jobDetails.data(), error: false });
  } catch (error) {
    res.status(409).send({ message: "Conflict occurs during Fetching", error: true, errorMessage: error });
  }
});

app.get("/filterJobs", async (req, res) => {
  const jobtype = req.headers.jobtype;
  const jobtitle = req.headers.jobtitle;
  const result = [];

  try {
    if (jobtype && !jobtitle) {
      const documentsRef = await getDocs(query(collection(db, "jobs"), where("jobCategroy", "==", jobtype)));
      documentsRef.docs.map((doc) => {
        result.push({ jobDetails: doc.data(), id: doc.id });
      });
    } else if (jobtitle && !jobtype) {
      const documentsRef = await getDocs(query(collection(db, "jobs"), where("jobTitle", "==", jobtitle)));
      documentsRef.docs.map((doc) => {
        result.push({ jobDetails: doc.data(), id: doc.id });
      });
    } else {
      const documentsRef = await getDocs(query(collection(db, "jobs"), where("jobTitle", "==", jobtitle), where("jobCategroy", "==", jobtype)));
      documentsRef.docs.map((doc) => {
        result.push({ jobDetails: doc.data(), id: doc.id });
      });
    }

    res.status(200).send({ result: result, error: false });
  } catch (error) {
    res.status(409).send({ message: "conflict while filtering", error: true, errorMessage: error });
  }
});

/* *********************************************************************** */
/* *********************************************************************** */
// Admin home
app.get("/homeDetails", async (req, res) => {
  const userid = req.headers.userid;
  let result = {
    userName: "",
    userCount: 0,
    jobsCount: 0,
    newsCount: 0,
  };

  try {
    const userRef = (await getDoc(doc(db, "users", userid))).data();
    const newsCount = (await getDocs(collection(db, "news"))).docs.length;
    const jobsCount = (await getDocs(collection(db, "jobs"))).docs.length;
    const userCount = (await getDocs(query(collection(db, "users"), where("admin", "==", false)))).docs.length;

    result = {
      userName: userRef.firstName + " " + userRef.lastName,
      userCount: userCount,
      jobsCount: jobsCount,
      newsCount: newsCount,
    };

    res.status(200).send({ message: "fetched successfully", result: result, error: false });
  } catch (error) {
    res.status(400).send({ message: "error when fetching stats", error: true, errMessage: error });
  }
});
