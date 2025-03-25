const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { formattedDate } = require("../utils/formattedDate");

module.exports = {
  createBorrows: async (req, res, next) => {
    try {
      const { memberId, bookId } = req.body;

      if (!memberId || !bookId) {
        return res.status(400).json({
          status: false,
          message: "Please provide both memberId and bookId",
          data: null,
        });
      }

      const member = await prisma.members.findUnique({
        where: { id: memberId },
        include: { borrowedBooks: true },
      });

      if (!member) {
        return res.status(404).json({
          status: false,
          message: "Member not found",
          data: null,
        });
      }

      if (member.penalty) {
        return res.status(403).json({
          status: false,
          message: "Member is currently penalized and cannot borrow books",
          data: null,
        });
      }

      if (member.borrowedBooks.length >= 2) {
        return res.status(400).json({
          status: false,
          message: "Member has already borrowed 2 books",
          data: null,
        });
      }

      const book = await prisma.books.findUnique({
        where: { id: bookId },
      });

      if (!book || book.borrowed) {
        return res.status(400).json({
          status: false,
          message: "Book is not available for borrowing",
          data: null,
        });
      }

      let currendDate = new Date();
      let returnedAt = new Date();

      returnedAt.setDate(currendDate.getDate() + 7);

      let formattedCurrentDate = formattedDate(currendDate);
      let formattedReturnedAt = formattedDate(returnedAt);

      const updatedBook = await prisma.books.update({
        where: { id: bookId },
        data: {
          borrowed: true,
          membersId: memberId,
          borrowedAt: formattedCurrentDate,
          returnedAt: formattedReturnedAt,
          stock: book.stock - 1,
        },
      });

      res.status(201).json({
        status: true,
        message: "Book borrowed successfully!",
        data: updatedBook,
      });
    } catch (err) {
      next(err);
    }
  },

  returnBorrows: async (req, res, next) => {
    try {
      const { memberId, bookId } = req.body;

      if (!memberId || !bookId) {
        return res.status(400).json({
          status: false,
          message: "Please provide both memberId and bookId",
          data: null,
        });
      }

      const member = await prisma.members.findUnique({
        where: { id: memberId },
        include: { borrowedBooks: true },
      });

      if (!member) {
        return res.status(404).json({
          status: false,
          message: "Member not found",
          data: null,
        });
      }

      const book = await prisma.books.findUnique({
        where: { id: bookId },
      });

      if (!book || book.membersId !== memberId) {
        return res.status(400).json({
          status: false,
          message: "Book is not borrowed by this member",
          data: null,
        });
      }

      const returnedDate = new Date();
      const dueDate = new Date(book.returnedAt);

      let penaltyDays = 0;
      if (returnedDate > dueDate) {
        penaltyDays = Math.floor(
          (returnedDate - dueDate) / (1)
        );
        if (penaltyDays > 7) {
          await prisma.members.update({
            where: { id: memberId },
            data: {
              penalty: true,
              penaltyUntil: new Date(
                returnedDate.getDate() + 3
              ),
            },
          });
        }
      }

      await prisma.books.update({
        where: { id: bookId },
        data: {
          borrowed: false,
          membersId: null,
          borrowedAt: null,
          returnedAt: null,
          stock: book.stock + 1,
        },
      });

      res.status(200).json({
        status: true,
        message: `Book returned successfully!${
          penaltyDays > 7 ? " Penalty applied." : ""
        }`,
      });
    } catch (err) {
      next(err);
    }
  },
};
