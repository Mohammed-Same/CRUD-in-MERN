const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const FormModel = require("./models/Form");
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://Form:form@form.tbbqpbg.mongodb.net/form?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FormModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.get("/read", async (req, res) => {
  FormModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});
app.post("/insert", async (req, res) => {
  const name = req.body.name;
  console.log(name);
  const age = req.body.age;
  const mobile = req.body.mobile;
  const year = req.body.year;
  const college = req.body.college;

  const form = new FormModel({
    name: name,
    age: age,
    mobile: mobile,
    year: year,
    college: college,
  });
  try {
    await form.save();
    res.send("insertedData");
  } catch (err) {
    console.log(err);
  }
});
app.put("/update", async (req, res) => {
  const newName = req.body.newName;
  const id = req.body.id;

  try {
    await FormModel.findById(id, (err, updatedForm) => {
      updatedForm.name = newName;
      updatedForm.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});
app.listen(3000, () => {
  console.log("server running on port 3000....");
});
