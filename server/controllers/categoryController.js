import Category from "../models/Category.js";
import Product from "../models/Product.js";

/**
 * Get all categories
 * GET /api/categories
 */
export const getAllCategories = async (req, res) => {
  try {
    const { activeOnly } = req.query;
    const filter = activeOnly === "true" ? { isActive: true } : {};
    
    const categories = await Category.find(filter)
      .sort({ displayOrder: 1, name: 1 });
    
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

/**
 * Get single category by ID
 * GET /api/categories/:id
 */
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    
    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

/**
 * Create new category
 * POST /api/categories
 */
export const createCategory = async (req, res) => {
  try {
    const { name, description, image, isActive, displayOrder } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }
    
    // Check if category with same name exists
    const existing = await Category.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, "i") } 
    });
    
    if (existing) {
      return res.status(400).json({ error: "Category with this name already exists" });
    }
    
    const category = await Category.create({
      name,
      description,
      image,
      isActive: isActive !== undefined ? isActive : true,
      displayOrder: displayOrder || 0,
    });
    
    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Category with this name or slug already exists" });
    }
    res.status(500).json({ error: "Failed to create category" });
  }
};

/**
 * Update category
 * PUT /api/categories/:id
 */
export const updateCategory = async (req, res) => {
  try {
    const { name, description, image, isActive, displayOrder } = req.body;
    
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    
    // If name is being changed, check for duplicates
    if (name && name !== category.name) {
      const existing = await Category.findOne({ 
        name: { $regex: new RegExp(`^${name}$`, "i") },
        _id: { $ne: req.params.id }
      });
      
      if (existing) {
        return res.status(400).json({ error: "Category with this name already exists" });
      }
    }
    
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (image !== undefined) updateData.image = image;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (displayOrder !== undefined) updateData.displayOrder = displayOrder;
    
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
};

/**
 * Delete category
 * DELETE /api/categories/:id
 */
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    
    // Check if category has products
    const productCount = await Product.countDocuments({ category: category.name });
    
    if (productCount > 0) {
      return res.status(400).json({ 
        error: `Cannot delete category. ${productCount} product(s) are using this category. Please reassign products first.` 
      });
    }
    
    await Category.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
};

/**
 * Get category statistics
 * GET /api/categories/stats
 */
export const getCategoryStats = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });
    const stats = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({ 
          category: category.name,
          isActive: true 
        });
        const totalRevenue = await Product.aggregate([
          { $match: { category: category.name } },
          {
            $lookup: {
              from: "orderitems",
              localField: "_id",
              foreignField: "product",
              as: "orderItems",
            },
          },
          {
            $unwind: "$orderItems",
          },
          {
            $group: {
              _id: null,
              total: { $sum: { $multiply: ["$orderItems.quantity", "$orderItems.price"] } },
            },
          },
        ]);
        
        return {
          categoryId: category._id,
          categoryName: category.name,
          productCount,
          totalRevenue: totalRevenue[0]?.total || 0,
        };
      })
    );
    
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching category stats:", error);
    res.status(500).json({ error: "Failed to fetch category statistics" });
  }
};

