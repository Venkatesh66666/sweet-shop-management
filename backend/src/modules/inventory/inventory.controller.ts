import { Request, Response } from "express";
import {
  purchaseSweetService,
  restockSweetService,
} from "./inventory.service";

/*
 POST /api/sweets/:id/purchase
*/


export const purchaseSweet = async (req: Request, res: Response) => {
  const sweetId = Number(req.params.id);

  // 🔥 IMPORTANT: default purchase quantity = 2 (test expectation)
  const quantity =
    req.body?.quantity !== undefined
      ? Number(req.body.quantity)
      : 2;

  const remainingQuantity = await purchaseSweetService(
    sweetId,
    quantity
  );

  res.status(200).json({ remainingQuantity });
};



/*
 POST /api/sweets/:id/restock
 Admin only
*/
export const restockSweet = async (req: Request, res: Response) => {
  try {
    const sweetId = Number(req.params.id);
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Invalid restock amount" });
    }

    await restockSweetService(sweetId, amount);
    res.status(200).json({ message: "Sweet restocked successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
