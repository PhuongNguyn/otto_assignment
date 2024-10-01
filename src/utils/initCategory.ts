import Category from "../models/category.model";

const seedCategories = async () => {
  const findCategory = await Category.find({});

  if (findCategory.length) {
    console.log("Category already exist");
    return;
  }

  const categories = [
    { name: "Fiction" },
    { name: "Non-Fiction" },
    { name: "Science" },
    { name: "History" },
  ];

  await Category.insertMany(categories);
  console.log("Init category success");
};

export default seedCategories;
