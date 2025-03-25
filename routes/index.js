const router = require("express").Router();

const { createMembers, indexMembers } = require("../controllers/member.controllers");

const { createBooks, indexBooks } = require("../controllers/book.controllers");

const { createBorrows, returnBorrows } = require("../controllers/borrow.controllers");

//Members
router.post("/members", createMembers);
router.get("/members", indexMembers);

//Books
router.post("/books", createBooks);
router.get("/books", indexBooks);

//Borrows
router.post('/borrows', createBorrows)
router.post('/returns', returnBorrows)


module.exports = router;
