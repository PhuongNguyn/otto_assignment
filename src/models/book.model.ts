import { Types } from "mongoose";
import { Schema, model, Document } from "mongoose";

interface IBook extends Document {
  title: string;
  price: number;
  author: string;
  isbn: string;
  review: string;
  category: Types.ObjectId;
  discount?: number;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    isbn: { type: String, required: true },
    review: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Book = model<IBook>("Book", bookSchema);

export default Book;
