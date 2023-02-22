import { User } from "@prisma/client";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user: User) => {
  const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT secret is not defined in the environment variables");
  }

  const secret: Secret = JWT_SECRET;

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    secret
  );
  return token;
};

export const protect = (req: any, res: any, next: any) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "Not Authorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(404);
    res.json({ message: "Bad Request" });
    return;
  }

  try {
    const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("JWT secret is not defined in the environment variables");
    }
    const secret: Secret = JWT_SECRET;
    const user = jwt.verify(token, secret);
    req.user = user;
    next();
  } catch (exception) {
    res.status(403);
    res.json({ message: "Invalid Token" });
  }
};
