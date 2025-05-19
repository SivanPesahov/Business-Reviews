import { Request, Response } from "express";
import Business, { IBusiness } from "../models/Business-model";
import { io } from "..";
interface RequestWithUserId extends Request {
  userId?: string | null;
}

async function getBusiness(req: Request, res: Response) {
  try {
    const business = await Business.find({});
    res.status(200).json(business);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getBusinessById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const business = await Business.findById(id);
    if (!business)
      return res.status(404).json({ message: "Business not found" });
    res.status(200).json(business);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function createBusiness(req: RequestWithUserId, res: Response) {
  const businessToCreate: Partial<IBusiness> = req.body;
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const nameToCheck = businessToCreate.name?.trim();
  const existingBusiness = await Business.findOne({ name: nameToCheck });

  if (existingBusiness) {
    return res.status(409).json({ message: "Business already exists in data" });
    return;
  }

  try {
    const newBusiness = new Business({ ...businessToCreate, user: userId });
    const savedBusiness = await newBusiness.save();

    io.emit("businessCreated", savedBusiness);
    res.status(201).json(savedBusiness);
  } catch (err: any) {
    console.error("Error while creating business", err);

    if (err.name === "ValidationError") {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error while creating review" });
    }
  }
}

export { getBusiness, getBusinessById, createBusiness };
