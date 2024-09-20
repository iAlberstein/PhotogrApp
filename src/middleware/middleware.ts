import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export default class Middleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`${req.method} a la ruta ${req.url}`);
        next();
    }
}

