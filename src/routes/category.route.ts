import { Router } from "express";
import { getAllCategory } from "../controllers/category.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated category ID
 *         name:
 *           type: string
 *           description: name of the category
 *       example:
 *         _id: 61d1fd8f5c2b2f12f62c0b9a
 *         name: Science
 */

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: The category managing API
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Returns the list of all the categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: The list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/", getAllCategory);

export default router;
