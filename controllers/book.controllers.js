const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createBooks: async (req, res, next) => {
    try {
      let { code, title, author, stock } = req.body;

      if (!code || !title || !author || !stock) {
        return res.status(400).json({
          status: false,
          message: "Please provide code, title, author, stock",
          data: null,
        });
      }

      let newBooks = await prisma.books.create({
        data: {
          code: code,
          title: title,
          author: author,
          stock: stock,
        },
      });

      res.status(201).json({
        status: true,
        message: "Book Has Benn Added!",
        data: newBooks,
      });
    } catch (err) {
      next(err);
    }
  },

  indexBooks: async (req, res, next) => {
    try {
      const availableBooks = await prisma.books.findMany({
        where: {
          borrowed: false,
        },
      });

      const totalAvailableBooks = availableBooks.length;

      res.status(200).json({
        status: true,
        message: "Available books retrieved successfully",
        data: {
          total: totalAvailableBooks,
          books: availableBooks,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
