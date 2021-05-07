const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [Category, Tag]
    });
    res.status(200).json(productData)
  } catch (err) {
    res.status(500).json(err)
  }
});

// Get one product
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [Category, Tag]
    });
    if(!productData) {
      res.json(404).json({ message: 'No product found with this ID.' });
      return
    };
    res.status(200).json(productData)
  } catch (err) {
    res.status(500).json(err)
  }
});

// Create new product
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    res.status(200).json({ message: 'Product created.' });
  } catch (err) {
    res.status(400).json(err)
  }
});

// Update product by its ID
router.put('/:id', async (req, res) => {
  try {
    const productData = await Product.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if(!productData) {
      res.status(404).json({ message:'No product found with that ID.' });
      return
    };
    res.status(200).json({ message:'Product updated.' });
  } catch (err) {
    res.status(500).json(err)
  }
});

// Delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!productData) {
      res.status(404).json({ message:'No product found with that ID.' });
      return
    };
    res.status(200).json({ message:'Product deleted' });
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
