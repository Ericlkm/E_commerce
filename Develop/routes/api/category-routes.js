const router = require("express").Router();

const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

  // find all categories
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
  try {
    const getData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name"],
        },
      ],
    });
    res.status(200).json(getData);
  } catch (err) {
    res.status(500).json(err);
  }

  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }

  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
