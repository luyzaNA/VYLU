import express from "express";
import {updateProductByIdController, createProductController, deleteProductByIdController, getAllProductsController, getProductByIdController} from "../controllers/product-controller.js";
import {currentUser} from "../middlewares/current-user.js";
import {requireAuth} from "../middlewares/require-auth.js";
import {requireAdmin} from "../middlewares/require-admin.js";
import {productCreatorValidator, productUpdateValidator} from "../middlewares/Express-validator/product-validator.js";
import {priceForNewProductValidator, priceForUpdatedProductValidator} from "../middlewares/Express-validator/price-validator.js";
import {validateRequest} from "../middlewares/request-validation.js";
import {upload} from "../middlewares/upload-files.js";

const product_router = express.Router();

product_router.post("/product",currentUser, requireAuth, requireAdmin,  upload.array('photos'),  productCreatorValidator, priceForNewProductValidator, validateRequest, createProductController);
product_router.get("/products", getAllProductsController);
product_router.get("/product/:id", getProductByIdController);
product_router.put("/product/:id", currentUser, requireAuth, requireAdmin, upload.array('photos'),productUpdateValidator, priceForUpdatedProductValidator,validateRequest, updateProductByIdController);
product_router.delete("/product/:id",currentUser, requireAuth, requireAdmin,  deleteProductByIdController);

export default product_router;
