const { addProduct, getProducts, getProduct, deleteProduct, updateProduct } = require("./products.controllers");
const {Router} = require("express");

const router = Router();

router.post('/',addProduct);
router.get('/', getProducts);
router.get('/:uuid', getProduct);
router.patch('/:uuid', updateProduct);
router.delete('/:uuid', deleteProduct);
module.exports= router;
