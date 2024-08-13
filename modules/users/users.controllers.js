const { User, Product } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");
const sequelize = require('sequelize');

const addUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const response = await User.create({
      name: name,
      phone: phone,
      password: password,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getUsers = async (req, res) => {
  try {
    const response = await User.findAndCountAll({
      attributes: {
        exclude:['id']
      }
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

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
      order: [[sequelize.literal('productCount'), 'DESC']],
      limit: 10,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = { addUser, getUsers, getUser, getUsersWithTopProductCount };
