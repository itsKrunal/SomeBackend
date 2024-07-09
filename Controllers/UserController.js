const User = require("../Models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
    try {
      const { userName, password } = req.body;
      const user = await User.findOne({ userName });
  
      if (!user) {
        return res.status(400).send({
          message: "Invalid username or password",
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).send({
          message: "Invalid username or password",
        });
      }
  
      const payload = {
        user: {
          id: user._id,
          userName: user.userName
        }
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict', // Helps prevent CSRF attacks
        maxAge: 3600000 // 1 hour in milliseconds
      });
  
      return res.status(200).send({
        token,
        message: "Logged in successfully",
      });
    } catch (err) {
      return res.status(500).send({
        error: err.message,
      });
    }
  };

exports.checkAuth = async (req, res) => {
    try {
        return res.status(200).send({
            message : "OK"
        })

    } catch (error) {
        return res.status(401).send({
            message: "Unauthorized!"
        })
    }
}

exports.registerUser = async (req, res) => {
    try {
        const {userName, password} = req.body;
        let salt = await bcrypt.genSalt(10);
        let newPassword = await bcrypt.hash(password, salt);
        const user = await User.findOne({userName});
        if(user) {
        return res.status(500).send({
            message: "User already exists!",
          });
        }
        await User.create({userName, password : newPassword});
    
        return res.status(201).send({
          message: "Registered successfully",
        });
      } catch (err) {
        return res.status(500).send({
          error: err.message,
        });
      }
}