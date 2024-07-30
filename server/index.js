const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/user")
const ExerciseList=require("./models/exerciseList")

// cookie parser module
const cookieParser = require("cookie-parser");
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true 
};

// middleware
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

const auth = require("./auth/auth");

// using bcrypt for password encryption
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


mongoose.connect("mongodb://127.0.0.1:27017/user")

// api for login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(async user => {
            if (user) {
                const isPasswordCorrect = await bcrypt.compare(password, user.password);
                if (isPasswordCorrect) {
                    const sessionToken=jwt.sign({id: user._id},"secretkey",{expiresIn: "1h"})
                    user.token=sessionToken;
                    user.password=undefined;
                    const options = {
                        expires: new Date(Date.now() + 60*60*1000),
                        sameSite: 'None',
                        secure: true,
                        domain: 'localhost',
                        path: '/'
                      };
                    res.status(200).cookie("token", sessionToken, options).json({success:true,sessionToken,user,options})
                    console.log(sessionToken);
                   
                } else {
                        res.status(400).send({ message: "incorrect password" })
                }
            } else {
                res.status(400).send({ message: "user not registered" })
                console.log("user not registered");
            }
        })
})

//api for register
app.post("/register", async (req, res) => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const { firstname, lastname, email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            const encryptedPassword = await bcrypt.hash(password, 10);
            if (req.body.email.match(emailRegex) && req.body.password.match(passwordRegex)) {
                const user = await UserModel.create({ firstname, lastname, email, password: encryptedPassword });
                console.log("satified");
                return res.json(user);
            }
        }
    } catch (err) {
        res.json({ message: "An error occurred", error: err });
    }
});

app.listen(3001, () => {
    console.log("sever is running");
})

// api to post exercises
app.post("/home/workout", auth, async (req, res) => {
    try {
      const { exercises } = req.body;
      console.log('Request body:', req.body);  

      console.log('Exercises:', exercises);  
      console.log('User ID:', req.user.id);  
  
      if (!Array.isArray(exercises) || exercises.length === 0) {
        return res.status(400).json({ message: "Invalid exercises array" });
      }
  
      const exerciseList = new ExerciseList({
        exercises,
        createdBy: req.user._id,
      });
  
      console.log('ExerciseList to be saved:', exerciseList);  
  
      await exerciseList.save();
      console.log('ExerciseList saved:', exerciseList);  
  
      await UserModel.findByIdAndUpdate(req.user._id, { $push: { exerciseLists: exerciseList._id } });
      console.log('User updated with new ExerciseList');  
  
      res.status(201).json(exerciseList);
    } catch (error) {
      console.error('Error creating exercise list:', error);
      res.status(400).json({ message: "Error creating exercise list", error });
    }
  });
  