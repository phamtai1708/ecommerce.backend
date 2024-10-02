const userMiddleware = {
  createUser: (req, res, next) => {
    try {
      const { userName, email, password } = req.body;
      if (!userName) throw new Error("userName is required");
      if (!email) throw new Error("email is required");
      if (!password) throw new Error("password is required");

      return next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        data: null,
      });
    }
  },
  login: (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email) throw new Error("email is required");
      if (!password) throw new Error("password is required");

      return next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        data: null,
      });
    }
  },
  updateUserName: (req, res, next) => {
    try {
      const { userId } = req.body;
      if (!userId) throw new Error("Please login before update");
      const { userName } = req.params;
      if (!userName) throw new Error("Please type your new data");

      return next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        data: null,
      });
    }
  },
  deleteUser: (req, res, next) => {
    try {
      const { userId } = req.params;
      if (!userId) throw new Error("Please type your new data");

      return next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        data: null,
      });
    }
  },
};
export default userMiddleware;
