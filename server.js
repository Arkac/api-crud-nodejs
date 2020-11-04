const express = require("express");
const app = express();
import { getUserList } from "./user";

const userList = getUserList();
app.use(express.json());
app.get("/users", (req, res) => {
  return res.status(200).send({
    success: "true",
    message: "users",
    users: userList,
  });
});

app.post("/addUser", (req, res) => {
  userList.push(req.body);
  res.status(200).json({
    success: "true",
    users: userList,
  });
});

app.put("/updateUser/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedUser = {
    id: id,
    isPublic: req.body.isPublic,
    name: req.body.name,
    companies: req.body.companies,
    books: req.body.books,
  };

  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id === id) {
      userList[i] = updatedUser;
      return res.status(201).send({
        success: "true",
        updatedUser,
      });
    }
  }

  return res.status(404).send({
    success: "true",
    message: "No User with this ID is present",
  });
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id === id) {
      userList.splice(i, 1);
      return res.status(201).send({
        success: "true",
        message: "user deleted ",
      });
    }
  }
  return res.status(404).send({
    success: "true",
    message: "error in deletion",
  });
});

app.listen(8000, () => {
  console.log("listening to 8000");
});
