import ProductSize from '../models/ProductSize.js';

export const createProductSize = async (data) => {
    const size = new ProductSize(data);
    return await size.save();
};

export const getAllProductSizes = async () => {
    return ProductSize.find({});
};

export const getProductSizeById = async (id) => {
    return ProductSize.findById(id);
};

export const updateProductSize = async (id, updateData) => {
    return ProductSize.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
};

export const deleteProductSize = async (id) => {
    return ProductSize.findByIdAndDelete(id);
};

export async function checkDuplicateProductSize(data) {
    const existing = await ProductSize.findOne({ type: data.type, label: data.label });
    return existing !== null;
}
