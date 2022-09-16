const mongoose = require("mongoose");
const FormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  mobile: {
    type: Number,
    // required: true,
  },
  year: {
    type: String,
    // required: true,
  },
  college: {
    type: String,
    // required: true,
  },
});

const Form = mongoose.model("Form", FormSchema);
module.exports = Form;
