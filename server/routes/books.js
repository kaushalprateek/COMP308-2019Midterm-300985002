// name: prateek 300985002 midterm test

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
  res.render("books/add", {
    title: "Add a New Book"
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
  let newBook = bookModel({
    Title: req.body.Title,
    Description: req.body.Description,
    Price: req.body.Price,
    Author: req.body.Author,
    Genre: req.body.Genre
  });

  bookModel.create(newBook, (err, contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // takes the user back to the contact-list page
      res.redirect("/books");
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get("/details/:id", (req, res, next) => {
  let id = req.params.id;

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
router.get("/:id", (req, res, next) => {
  let id = req.params.id;

  bookModel.remove({ _id: id }, err => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect("/books");
    }
  });
});

module.exports = router;
