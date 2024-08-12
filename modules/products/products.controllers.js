const { Product } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");

const addProduct = async (req, res) => {
  try {
    const { name, description, price, image, ratings } = req.body;
    const response = await Product.create({
      name,
      description,
      price,
      image,
      ratings,
    });
    console.log("🚀 ~ addProduct ~ response:", response);
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
    console.log(error);
  }
};

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
};
