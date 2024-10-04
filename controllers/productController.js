const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    const { category, priceMin, priceMax } = req.query;

    try {
        const query = {};
        if (category) query.category = category;
        if (priceMin || priceMax) {
            query.price = {};
            if (priceMin) query.price.$gte = priceMin;
            if (priceMax) query.price.$lte = priceMax;
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err });
    }
};
