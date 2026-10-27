import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { address, paymentMethod } = req.body;

    // Check authenticated user
    const userId = req.user?.id || req.user?._id || req.user?.userId;
    console.log("Authenticated User:", req.user);
    console.log("Authenticated User ID:", userId);

    if (!userId) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    // Find the logged-in user's cart
    const cart = await Cart.findOne({
      user: userId,
    }).populate("items.menuItem");

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Calculate total from database prices
    const totalAmountCalculated = cart.items.reduce((total, item) => {
      if (!item.menuItem) {
        throw new Error("A menu item in the cart no longer exists");
      }

      return total + item.menuItem.price * item.quantity;
    }, 0);

    // Create order
    const newOrder = await Order.create({
      user: userId,
      items: cart.items.map((item) => ({
        menuItem: item.menuItem._id,
        quantity: item.quantity,
      })),
      totalAmount: totalAmountCalculated,
      address,
      paymentMethod,
    });

    return res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Place Order Error:", error);

    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).populate(
      "items.menuItem",
    );
    res.status(200).json({
      message: "User orders retrieved successfully",
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get User Orders Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.menuItem");
    res.status(200).json({
      message: "All orders retrieved successfully",
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get All Orders Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status;
    await order.save();
    res.status(200).json({
      message: "Order status updated successfully",
      success: true,
      order,
    });
  } catch (error) {
    console.error("Update Order Status Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
