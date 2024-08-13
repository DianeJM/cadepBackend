const { Router } = require("express");
const { addUser, getUsers, getUser, getUsersWithTopProductCount } = require("./users.controllers");

const router = Router();

router.post("/", addUser);
router.get("/", getUsers);
router.get('/mostproducts', getUsersWithTopProductCount);
router.get("/:uuid", getUser);
router.delete('/:uuid')
router.patch('/:uuid')
router.get("/:role")

module.exports = router;
