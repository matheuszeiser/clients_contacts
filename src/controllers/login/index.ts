import { AppError } from "../../errors/AppError";
import { ILogin } from "../../interfaces/login";
import createLoginService from "../../services/login";
import { Request, Response } from "express";
import { handleError } from "../../middlewares/errors.mid";

const createLoginController = async (req: Request, res: Response) => {
  try {
    const { username, password }: ILogin = req.body;
    const token = await createLoginService({ username, password });
    return res.json({ token });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export { createLoginController };
