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
    const newCategory = await Category.create(req.body, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name"],
        },
      ],
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }

  // create a new category
});

router.put("/:id", async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      include: {
        model: Product,
        attributes: ["id", "product_name"],
      },
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err);
  }

  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const category_id = req.params.id;
    const deleteCategory = await Category.destroy({
      where: {
        id: category_id,
      },
    });

    if (deleteCategory) {
      res
        .status(200)
        .json({ message: `category id ${category_id} is deleted! 👍` });
    } else {
      res
        .status(404)
        .json({ message: `category id ${category_id} is not found! ⚠️` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
