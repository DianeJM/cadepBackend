const { Router } = require("express");
const { addUser, getUsers, getUser, getUsersWithTopProductCount, userLogin } = require("./users.controllers");

const router = Router();

router.post("/", addUser);
router.post("/login", userLogin);
router.get("/", getUsers);
router.get('/mostproducts', getUsersWithTopProductCount);
router.get("/:uuid", getUser);
router.delete('/:uuid')
router.patch('/:uuid')
router.get("/:role")

module.exports = router;
