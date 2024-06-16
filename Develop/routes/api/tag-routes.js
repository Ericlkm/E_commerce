const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock"],
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  try {
    const tag_id = req.params.id;
    const tagData = await Tag.findByPk(tag_id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock"],
        },
      ],
    });
    if (!tagData) {
      res.status(404).json({ message: `\x1b not found \x1b` });
    } else {
      res.status(200).json(tagData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  try {
    const tagData = Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // create a new tag
});

router.put("/:id", async (req, res) => {
  try {
    const tag_id = req.params.id;
    const tagData = await Tag.update(req.body, {
      where: {
        id: tag_id,
      },
    });
    if (!tagData) {
      res
        .status(404)
        .json({ message: `\x1b could not update id not found \x1b` });
    } else {
      res.status(200).json(tagData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const tag_id = req.params.id;
    const deleteTagData = await Tag.destroy({
      where: {
        id: tag_id,
      },
    });
    if (!tagData) {
      res
        .status(404)
        .json({ message: `\x1b could not delete id not found \x1b` });
    } else {
      res.status(200).json(deleteTagData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
