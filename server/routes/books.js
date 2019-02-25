// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the book model
let bookModel = require("../models/books");

/* GET books List page. READ */
router.get("/", (req, res, next) => {
  // find all books in the books collection
  bookModel.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("books/index", {
        title: "Books",
        books: books
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
});

// GET the Book Details page in order to edit an existing Book
router.get("/details/:id", (req, res, next) => {
  let id = req.params.id;
  console.log(id);
  bookModel.findById(id, (err, bookObject) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // show the edit view
      res.render("books/details", {
        title: "Edit books",
        books: bookObject
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/details/:id", (req, res, next) => {
  let id = req.params.id;

  let updatedBook = bookModel({
    _id: id,
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  });

  bookModel.update({ _id: id }, updatedBook, err => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book-list
      res.redirect("/books");
    }
  });
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
});

module.exports = router;
