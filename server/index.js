const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors")



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud", // Fix typo here
});

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("salam this is a server");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `price`,`des`, `cover`) VALUES (?)"; // Fix typo here
    const values = [
        req.body.title,
        req.body.des,
        req.body.cover,
        req.body.price,
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json('boos added to databse');
    });
});

app.delete("/books/:id",(req,res)=>{
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q,[bookId],(err,data)=>{
    if (err) return res.json(err);
    return res.json(`deleted ${bookId} from the table`);
  })
})

app.put("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`=?, `des`=?, `price`=?, `cover`=? WHERE id =? ";
    const values = [
        req.body.title,
        req.body.des,
        req.body.cover,
        req.body.price
    ]
    db.query(q,[...values,bookId],(err,data)=>{
      if (err) return res.json(err);
      return res.json(`update ${bookId} from the table`);
    })
})

app.listen(3800, () => {
    console.log('server is running');
});
