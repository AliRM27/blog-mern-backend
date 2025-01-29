import express from "express";
import multer from "multer";
import mongoose from "mongoose";

import { registerValidation, loginValidation, postCreateValidation} from "./validations.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { PostController, UserController } from "./controllers/index.js";

mongoose                                                                  //creted db (blog)
    .connect("mongodb+srv://amammadov097:Alibaba1@cluster0.bb3mx.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DataBase is OK"))
    .catch((err) => console.log("DataBase Error\n", err)) //connect to Database

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads")
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

app.use(express.json()) //allow to read json in body eg.
app.use("/uploads", express.static("uploads")) //if a request comes from /uploads, check if there is a file in uploads

//authotification
app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register)
app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login)
app.get("/auth/me", checkAuth, UserController.getMe)

//upload images
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
    res.json({
        url: `uploads/${req.file.originalname}`
    })
})

//CRUD
app.get("/posts", PostController.getAll)
app.get("/posts/:id", PostController.getOne)
app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.patch("/posts/:id", checkAuth, postCreateValidation, handleValidationErrors, PostController.update)
app.delete("/posts/:id", checkAuth, PostController.remove)

app.listen(4444, (err) => {
    if(err){
        return console.log(err)
    }else{
        console.log("Server OK")
    }
})