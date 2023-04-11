import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmSt1PPNjbe2uIn2g99N9oz4Y7znBsJz4",
  authDomain: "fir-learn-e906e.firebaseapp.com",
  projectId: "fir-learn-e906e",
  storageBucket: "fir-learn-e906e.appspot.com",
  messagingSenderId: "275072242606",
  appId: "1:275072242606:web:545487247eaec77701ae3f",
};

initializeApp(firebaseConfig); // here now you make a connnect with youre fire base app

// initial firebase app
initializeApp(firebaseConfig);

// initial service

const db = getFirestore();

// => first method to connect to the back end
// async function getbooks(db) {
//   const booksCol = collection(db, "books");
//   const booksSnapshot = await getDocs(booksCol);
//   const booksList = booksSnapshot.docs.map((doc) => doc.data());
//   console.log(booksList);
//   return booksList;
// }
// getbooks(db);

// => second method to connect to the back end db

// collection ref
const colRef = collection(db, "books");
// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });

// adding docs
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting docs
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
