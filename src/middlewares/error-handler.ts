import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("DEBUG:", err.message);

  if (err.code === "P2025") {
    return res.status(404).json({ error: "Not Found", message: err.message });
  }

  res.status(err.status || 500).json({
    error: err.name || "Server Error",
    message: err.message,
  });
};
