import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getPagingBook,
  updateBook,
} from "../controllers/book.controller";
import authMiddleware from "../middlewares/authentication.middleware";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - author
 *         - category
 *         - review
 *         - isbn
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         price:
 *           type: number
 *           description: The price of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         category:
 *           type: 66fc4c35b5eb3b69e52bb42f
 *           description: The category id of the book
 *       example:
 *         title: "The Great Gatsby"
 *         price: 10.99
 *         author: "F. Scott Fitzgerald"
 *         category: "66fc4c35b5eb3b69e52bb42f"
 *         review: "It's an interesting book"
 *         isbn: "912304123"
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books listing API
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: pageIndex
 *         description: Page index of books that you want to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/", getPagingBook);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 */
router.get("/:id", getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     security:
 *       - bearerAuth: []
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request
 */
router.post("/", authMiddleware, createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update the book by id
 *     security:
 *       - bearerAuth: []
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 *       400:
 *         description: Bad request
 */
router.put("/:id", authMiddleware, updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Remove the book by id
 *     security:
 *       - bearerAuth: []
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */
router.delete("/:id", authMiddleware, deleteBook);

export default router;
