const express = require("express");
const todoController = require("./controllers/todoController");
const router = express.Router();

router.get("/", todoController.listItems);
router.post("/", todoController.createItem);
router.delete("/", todoController.deleteItem);
router.put("/", todoController.updateItem);
router.put("/status", todoController.updateStatus);

module.exports = router;
