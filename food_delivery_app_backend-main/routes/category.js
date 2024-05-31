var express = require("express");
const { getOneFoodById,
    getAllCategory
 } = require("../services/category.service");
var router = express.Router();

router.get("/", async (req, res) => {
  let response = await getAllCategory();
  res.json(response);
});

// router.get("/:foodId", async (req, res) => {
//   let foodId = req?.params?.foodId;
//   let response = await getOneFoodById(foodId);
//   res.json(response);
// });

module.exports = router;
