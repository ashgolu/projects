const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const UserModel=require("./models/user")

const app= express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/user")

// api for login
app.post("/login",(req,res)=>{
    const {email,password}=req.body;
        UserModel.findOne({email:email})
        .then(user=>{
            if(user){
                if(user.password===password){
                    res.json("success")
                }else{
                    res.json({message:"incorrect password"})
                }
            }else{
                res.json({message:"user not registered"})
            }
        })})

    //api for register
    app.post("/register", async (req, res) => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const { firstname, lastname, email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            if(req.body.email.match(emailRegex) && req.body.password.match(passwordRegex)){
             const user = await UserModel.create(req.body);
                console.log("satified");
                return res.json(user);
            }
        }  
    } catch (err) {
        res.json({ message: "An error occurred", error: err });
    }
});

    app.listen(3001,()=>{
        console.log("sever is running");
    })
