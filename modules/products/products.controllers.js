const { Product, User } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");

//NOTE: NEVER EXPOSE THE ID
//NOTE: NEVER USE FOR LOOP/ FOR EACH :: IF NOT USE SQL QUERIES AS loops are slow very slow

//add a new product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, image, ratings } = req.body;
    const { uuid } = req.params;

    const user = await User.findOne({
      where: {
        uuid,
      },
    });
    if (user) {
      const response = await Product.create({
        name,
        userId: user.id,
        description,
        price,
        image,
        ratings,
      });
      successResponse(res, response);
    } else {
      res.status(401).json({
        status: false,
        message: "Unauthorised",
      });
    }
  } catch (error) {
    errorResponse(res, error);
    console.log(error);
  }
};

// get all products
const getProducts = async (req, res) => {
  try {
    const response = await Product.findAllAndCount({
      attributes: {
        exclude: id,
      },
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

// get product by uuid
const getProduct = async (req, res) => {
  try {
    const uuid = req.params();
    const response = await Product.findOne({
      where: {
        uuid: uuid,
      },
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

//get products that belong to certain user
const getUserProducts = async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await User.findOne({
      where: {
        uuid,
      },
    });
    if (user) {
      const response = await Product.findAll({
        where: {
          userId: user.id,
        },
      });
      successResponse(res, response);
    } else {
      res.status(404).json({
        status: false,
        message: "Wrong uuid",
      });
    }
  } catch (error) {
    errorResponse(res, error);
  }
};

//get product with their user
const getProductsWithUser = async (req, res) => {
  try {
    const response = await Product.findAll({
      // include: [User]   -expects array since i can include more than one model   OR below method
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "id", "updatedAt"],
          },
        },
      ],
    });

    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

// edit one product data by uuid
const updateProduct = async (req, res) => {
  try {
    const uuid = req.params();
    const product = Product.findOne({
      where: {
        uuid,
      },
    });
    const response = await product.update({
      ...payload,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

//delete one product data by uuid
const deleteProduct = async (req, res) => {
  try {
    const uuid = req.params();
    const product = Product.findOne({
      where: {
        uuid,
      },
    });
    const response = await product.destroy({
      where: {
        uuid,
      },
    });
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getUserProducts,
  getProductsWithUser,
};
