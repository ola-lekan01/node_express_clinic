import { prisma } from "../modules/db";

//To Get all Products
export const getProducts = async (req: any, res: any) => {
  const product: any = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      Products: true,
    },
  });
  res.json({ data: product });
};

//Get a particular product

export const getOneProduct = async (req: any, res: any) => {

  const product = await prisma.product.findFirst({
    where: {
      id: req.body.id,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: product });
};

//Create Product

export const createProduct = async (req: any, res: any, next: any) => {
  try{
    const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: product });
  } catch(e){
    next(e)
  }
  
};

export const updateProduct = async (req: any, res: any) => {
  const updatedProduct = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });
  res.json({ data: updatedProduct });
};

export const deleteProduct = async (req: any, res: any) => {
  const deletedProduct = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  });
  res.json({ data: deletedProduct });
};
