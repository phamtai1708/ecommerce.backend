const productMiddleware = {
  createProduct: (req, res, next) => {
    try {
      const {
        productName,
        description,
        import_price,
        max_price,
        min_price,
        residual,
        colors,
        sizes,
      } = req.body;
      if (!productName) throw new Error("productName is required");
      if (!description)
        throw new Error("description about product is required");
      if (!import_price) throw new Error("import_price is required");
      if (!max_price) throw new Error("max_price is required");
      if (!min_price) throw new Error("min_price is required");
      if (!residual) throw new Error("residual is required");
      if (!colors) throw new Error("colors is required");
      if (!sizes) throw new Error("sizes is required");

      return next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        data: null,
      });
    }
  },
};
export default productMiddleware;
