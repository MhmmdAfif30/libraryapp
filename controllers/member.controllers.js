const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createMembers: async (req, res, next) => {
    try {
      let { name, code } = req.body;

      if (!name || !code) {
        return res.status(400).json({
          status: false,
          message: "Please provide name and code",
          data: null,
        });
      }

      let newMembers = await prisma.members.create({
        data: {
          name: name,
          code: code,
        },
      });

      res.status(201).json({
        status: true,
        message: "Members Has Been Created",
        data: newMembers,
      });
    } catch (err) {
      next(err);
    }
  },

  indexMembers: async (req, res, next) => {
    try {
      const memberBorroweds = await prisma.members.findMany({
        include: {
          borrowedBooks: true,
        },
      });

      res.status(200).json({
        status: true,
        message: "List of members and total book loans",
        data: memberBorroweds,
      });
    } catch (err) {
      next(err);
    }
  },
};
