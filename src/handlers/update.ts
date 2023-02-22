import { prisma } from "../modules/db";

// To get all All Updates

export const getUpdates = async (req: any, res: any) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Updates: true,
    },
  });
  const allUpdates = products.reduce((allUpdates: any, product: any) => {
    return [...allUpdates, ...product.Updates];
  }, []);

  res.json({ data: allUpdates });
};

//To get a particular update

export const getOneUpdate = async (req: any, res: any) => {
  const getOneUpdate = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: getOneUpdate });
};

//To create An Update

export const createUpdate = async (req: any, res: any) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });
  if (!product) {
    return res.json({ message: "Product does not belong to you!!!" });
  }
  const createdUpdate = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      version: req.body.version,
      asset: req.body.asset,
      productId: req.body.productId,
    },
  });
  res.json({ data: createdUpdate });
};

//To delete an Update

export const deleteUpdate = async (req: any, res: any) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Updates: true,
    },
  });

  const updates = products.reduce((allUpdates: any, product: any) => {
    return [...allUpdates, ...product.Updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ data: "Invalid Updates!!!" });
  }

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: deletedUpdate, message: "Successful" });
};

//To update an Update

export const makeUpdate = async (req: any, res: any) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Updates: true,
    },
  });

  const updates = products.reduce((allUpdates: any, product: any) => {
    return [...allUpdates, ...product.Updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ data: "Invalid Updates!!!" });
  }

  const madeUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: {
      title: req.body.title,
      body: req.body.body,
      version: req.body.version,
      asset: req.body.asset,
      productId: req.body.id,
    },
  });
  res.json({ data: madeUpdate });
};
