const { query } = require('express');
const Product = require('../models/Product');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({ numHits: products.length, products });
};

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericalFilters } = req.query;
    const queryObj = {};

    if (featured) {
        queryObj.featured = featured.toLowerCase() === 'true' ? true : false;
    }

    if (company) {
        queryObj.company = company;
    }

    if (name) {
        queryObj.name = { $regex: name, $options: 'i' };
    }

    if (numericalFilters) {
        const mapOperator = {
            '<': '$lt',
            '>': '$gt',
            '=': '$eq',
            '<=': '$lte',
            '>=': '$gte'
        }
        const regexOp = /\b(<|>|=|<=|>=)\b/g;
        let filters = numericalFilters.replace(regexOp, match => `-${mapOperator[match]}-`);
        
        const options = ['price', 'rating'];
        filters.split(',').forEach(filter => {
            const [field, op, value] = filter.split('-');

            if (options.includes(field)) {
                queryObj[field] = { [op]: Number(value) };
            }
        });
    }

    let result = Product.find(queryObj);

    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }

    if (fields) {
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    const products = await result;
    
    res.status(200).json({ numHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
