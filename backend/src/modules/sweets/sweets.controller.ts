import { Request, Response } from "express";
import {
  createSweetService,
  getAllSweetsService,
  searchSweetsService,
  updateSweetService,
  deleteSweetService,
} from "./sweets.service";

/*
 POST /api/sweets
 Admin only
*/
export const createSweet = async (req: Request, res: Response) => {
  try {
    const { name, category, price, quantity } = req.body;

    await createSweetService({ name, category, price, quantity });

    res.status(201).json({
      name,
      category,
      price,
      quantity,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


/*
 GET /api/sweets
 Protected
*/
export const getAllSweets = async (_req: Request, res: Response) => {
  try {
    const sweets = await getAllSweetsService();
    res.status(200).json(sweets);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/*
 GET /api/sweets/search
 Protected
*/
export const searchSweets = async (req: Request, res: Response) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const sweets = await searchSweetsService(
      name as string,
      category as string,
      minPrice ? Number(minPrice) : undefined,
      maxPrice ? Number(maxPrice) : undefined
    );

    res.status(200).json(sweets);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/*
 PUT /api/sweets/:id
 Admin only
*/
export const updateSweet = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await updateSweetService(id, req.body);
    res.status(200).json({ message: "Sweet updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/*
 DELETE /api/sweets/:id
 Admin only
*/
export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await deleteSweetService(id);
    res.status(200).json({ message: "Sweet deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
