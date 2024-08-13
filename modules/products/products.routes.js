const { addProduct, getProducts, getProduct, deleteProduct, updateProduct, getUserProducts, getProductsWithUser, getUsersWithTopProductCount } = require("./products.controllers");
const {Router} = require("express");

const router = Router();

router.post('/:uuid',addProduct);
router.get('/', getProducts);
router.get('/user/:uuid', getUserProducts);
router.get('/withuser', getProductsWithUser);
router.get('/:uuid', getProduct);
router.patch('/:uuid', updateProduct);
router.delete('/:uuid', deleteProduct);
module.exports= router;
