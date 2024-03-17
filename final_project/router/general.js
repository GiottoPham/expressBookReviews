const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Write your code here
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(books,null,4))
    },3000)})

    const result = await myPromise1
  return res.send(result);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(books[req.params.isbn])
    },3000)})

    const result = await myPromise1
    
  return res.send(result);
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  //Write your code here
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
  const founded = Object.values(books).find(({author})=>author===req.params.author);

      resolve(founded);
    },3000)})

    const result = await myPromise1
    
  return res.send(result);
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
        const founded = Object.values(books).find(({title})=>title===req.params.title)

      resolve(founded);
    },3000)})

    const result = await myPromise1
    
  return res.send(result);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const founded = books[req.params.isbn]
  return res.send(JSON.stringify(founded.reviews,null,4))
});

module.exports.general = public_users;
