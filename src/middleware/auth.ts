import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config";

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const bearerString = req.headers.authorization?.split(" ");
  if (!bearerString || bearerString.length != 2)
    return res.status(401).json({ error: "Unauthorized" });

  const token = bearerString[1];
  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err || !decoded) return res.status(401).json({ error: "Unauthorized" });
    res.locals.id = decoded.id;
    return next();
  });
};
