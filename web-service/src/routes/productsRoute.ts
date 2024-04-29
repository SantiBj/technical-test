import { NextFunction, Request, Response } from "express";
import {
  APIRouter,
  CheckableAPIRouter,
  CheckableGetRequest,
  RequestAxiosCall,
  RequestContext,
  RequestParameterType,
} from "itrm-tools";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../service/jwt.service";
import { productsSamples } from "../documentation/products";

class CustomRouter extends APIRouter {
  constructor(path: string, options?: any) {
    super(path, options);
  }

  protected async runMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        error: "access token is required.",
      });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        error: "invalid token",
      });
    }

    verify(token, SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(403).json({ error: "forbidden" });
      }
      next();
    });
  }
}

class ProductsRequest extends CheckableGetRequest {
  constructor() {
    super({
      path: "/",
      params: [],
      details: {
        description: "Products",
        samples: productsSamples,
      },
    });
  }

  public async apply(req: Request, res: Response): Promise<any> {
    RequestAxiosCall.get("https://dummyjson.com/carts")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(500).json({
          error: "internal server error.",
        });
      });
  }
}

export const productsRouter = new CustomRouter("/products");
productsRouter.init();
productsRouter.addRequest(new ProductsRequest());
