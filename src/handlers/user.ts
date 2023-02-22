import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import { prisma } from "../modules/db";

export const createNewUser = async (req: any, res: any, next: any) => {
  try {
    const user: any = await prisma.user.create({
    data: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });
    const token = createJWT(user);
    res.json({ token });

  } catch (err: any){
    err.type = "input";
    next(err)
  }
};

export const signInUser = async (req: any, res: any) => {
  const user: any = await prisma.user.findUnique({
    where: {
      username: req.body.username
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);
  if (!isValid) {
    res.status(401);
    res.json({ message: "UserName or Email does not Exist" });
  }
  const token = createJWT(user);
  res.json({ token });
};