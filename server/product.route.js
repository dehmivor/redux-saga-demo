const express = require("express");
const productModel = require("./product.model");
const router = express.Router();

// Lấy tất cả sản phẩm
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Thêm sản phẩm mới
router.post("/", async (req, res) => {
  const product = new productModel(req.body);
  await product.save();
  res.json(product);
});

// Cập nhật sản phẩm
router.put("/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(product);
});

// Xóa sản phẩm
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
