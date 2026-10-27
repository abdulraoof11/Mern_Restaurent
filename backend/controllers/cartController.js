import Cart from "../models/cartModel.js";
import Menu from "../models/menuModel.js";

export const addToCart = async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;
    const { id } = req.user;
    const menuItem = await Menu.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    let cart = await Cart.findOne({ user: id });
    if (!cart) {
      cart = new Cart({ user: id, items: [] });
    }
    const existingItem = cart.items.find(
      (item) => item.menuItem.toString() === menuItemId,
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ menuItem: menuItemId, quantity });
    }
    await cart.save();
    res
      .status(200)
      .json({ message: "Item added to cart", success: true, cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add item to cart", error: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const { id } = req.user;
    const cart = await Cart.findOne({ user: id }).populate("items.menuItem");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res
      .status(200)
      .json({ success: true, cart, message: "Cart retrieved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve cart", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { menuItemId } = req.body;
    const { id } = req.user;
    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.items = cart.items.filter(
      (item) => item.menuItem.toString() !== menuItemId,
    );
    await cart.save();
    res
      .status(200)
      .json({ success: true, cart, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove item from cart",
      error: error.message,
    });
  }
};
