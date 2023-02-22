import { Router } from "express";

import { body } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  makeUpdate,
} from "./handlers/update";

import { handleInputErrors } from "./modules/middleware";

const router = Router();

/*
Product
*/

router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);

router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);

router.delete("/product/:id", deleteProduct);

/*
Update
*/

router.get("/update", getUpdates);

router.get("/update/:id", getOneUpdate);

router.put(
  "/update/:id",
  body("title").isString(),
  body("body").isString(),
  body("version").optional().isString(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("asset").optional().isString(),
  body("productId").exists().isString(),
  handleInputErrors,
  makeUpdate
);

router.post(
  "/update",
  body("title").isString(),
  body("body").isString(),
  handleInputErrors,
  createUpdate
);

router.delete("/update/:id", deleteUpdate);

/*
Update Point
*/

router.get("/updatepoint", () => {});

router.get("/updatepoint/:id", () => {});

router.put(
  "/updatepoint/:id",
  body("name").isString(),
  body("description").isString(),
  handleInputErrors,
  (res: any, req: any) => {}
);

router.post(
  "/updatepoint",
  body("name").isString().optional(),
  body("description").isString().optional(),
  body("updateId").exists().isString(),
  handleInputErrors,
  (res: any, req: any) => {}
);

router.delete("/updatepoint/:id", () => {});

router.use((err: any, req: any, res: any, next: any) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized." });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid Input.." });
  } else {
    res.status(500).json({ message: "Opps thats on us from Sub Router... " });
  }
});

export default router;
