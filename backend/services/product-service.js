import Product from "../models/Product.js";
import {combineSizeWithOverride} from "../utils/calculate-size.js";

export const createProduct = async (data) => {
    const product = await Product.create(data);

    product.relatedProducts = await findRelatedProducts(product);
   return await product.save();
};

export const getAllProductsWithCombinedSize = async (query = {}) => {
    const products = await Product.find(query).populate('size');

    return products.map(product => {
        const combinedSize = combineSizeWithOverride(product.size, product.customSizeOverride);
        return { ...product.toObject(), size: combinedSize };
    });
};

export const updateProductById = async (id, data) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

    if (updatedProduct) {
        updatedProduct.relatedProducts = await findRelatedProducts(updatedProduct);
        await updatedProduct.save();
    }
    return updatedProduct;
};

export const deleteProductById = async (id) => {
    return await Product.findByIdAndDelete(id);
};

export const checkDuplicateProductName = async (name) => {
    return  await Product.findOne({ name });
};

export const getProductWithCombinedSize =  async (id) =>{
    const product = await Product.findById(id).populate('size');
    if (!product) return null;

    const combinedSize = combineSizeWithOverride(product.size, product.customSizeOverride);
    return { ...product.toObject(), size: combinedSize };
}

export const findProductById = async (id) => {
    return Product.findById(id);
};

export  const  findRelatedProducts = async(product)=>  {
    const related = await Product.find({
        _id: { $ne: product._id },
        color: product.color,
        tags: { $in: product.tags }
    }).limit(5);
    return related.map(p => p._id);
}
export const getAllProducts = async (query = {}) => {
    // Filtre
    const filters = {};
    if (query.gender) filters.gender = query.gender;
    if (query.color) filters.color = query.color;
    if (query.size) filters.size = query.size;

    // Sortare
    let sort = {};
    if (query.sort) {
        query.sort.split(',').forEach(field => {
            let direction = 1;
            if (field.startsWith('-')) {
                direction = -1;
                field = field.substring(1);
            }
            if (field === 'price' || field === 'price.original') {
                sort['price.original'] = direction;
            } else if (field === 'price.sale') {
                sort['price.sale'] = direction;
            } else {
                sort[field] = direction;
            }
        });
    }

    // Paginare
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('size');

    return products.map(product => {
        const combinedSize = combineSizeWithOverride(product.size, product.customSizeOverride);
        return { ...product.toObject(), size: combinedSize };
    });
};
