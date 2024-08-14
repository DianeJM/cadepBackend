const { User, Product } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// create a user
const addUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const response = await User.create({
      name: name,
      phone: phone,
      password: hashedPassword,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

// get users
const getUsers = async (req, res) => {
  try {
    const response = await User.findAndCountAll({
      attributes: {
        exclude: ["id"],
      },
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

//get one user by uuid
const getUser = async (req, res) => {
  try {
    const { uuid } = req.params;
    const response = await User.findOne({
      where: {
        uuid: uuid,
      },
    });
    if (response) {
      successResponse(res, response);
    } else {
      res.status(404).json({
        status: false,
        message: "Oops! Data with this ID does not exist",
      });
    }
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

//get 10 users with greatest product count
const getUsersWithTopProductCount = async (req, res) => {
  try {
    // const response = await sequelize.query('SELECT userId,COUNT(id) FROM Products GROUP BY userId LIMIT 10;');
    const response = await User.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM Products AS product
                        WHERE
                            product.userId = user.id
                    )`),
            "productCount",
          ],
        ],
      },
      order: [[sequelize.literal("productCount"), "DESC"]],
      limit: 10,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

// User login
const userLogin = async (req, res) => {
  try {
    const {phone, password} = req.body;
    const user = await User.findOne({
      where: {
        phone, 
      }
    });
    if(user){
      const decryptpwd = await bcrypt.compare(password, user.password);
      if(decryptpwd){
        const access_token = jwt.sign(user.dataValues, process.env.JWT_SECRET_KEY, {expiresIn: "30days" });
        const refresh_token = jwt.sign(user.dataValues, process.env.JWT_REFRESH_KEY);
        successResponse(res, {
          status: true,
          ACCESS_TOKEN: access_token,
          REFRESH_TOKEN: refresh_token
        });
      }else{
        res.status(401).json({
          status:false,
          message: "wrong password"
        })
      }
    }else{
      res.status(404).json({
        status:false,
        message: "user not found"
      })
    }
  } catch (error) {
    errorResponse(res, error);
  }
};

//refresh token api

module.exports = { addUser, getUsers, getUser, getUsersWithTopProductCount, userLogin };
