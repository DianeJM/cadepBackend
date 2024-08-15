const { upload } = require("../../utils/uploadFiles");
const { verifyJWT } = require("../../utils/verifyJWT");
const { addProduct, getProducts, getProduct, deleteProduct, updateProduct, getUserProducts, getProductsWithUser, getUsersWithTopProductCount } = require("./products.controllers");
const {Router} = require("express");
const router = Router();

router.post('/:uuid', upload.single('image'),  addProduct);
router.get('/',verifyJWT, getProducts);
router.get('/user/',verifyJWT, getUserProducts);
router.get('/withuser', getProductsWithUser);
router.get('/:uuid', getProduct);
router.patch('/:uuid', updateProduct);
router.delete('/:uuid', deleteProduct);
module.exports= router;
