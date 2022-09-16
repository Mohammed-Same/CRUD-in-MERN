import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [year, setYear] = useState("");
  const [college, setCollege] = useState("");
  const [date, setDate] = useState("");
  const [list, setList] = useState([]);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3000/read").then((response) => {
      setList(response.data);
    });
  }, []);
  const addTodo = () => {
    Axios.post("http://localhost:3000/insert", {
      name: name,
      age: age,
      date: date,
      mobile: mobile,
      year: year,
      college: college,
    });
  };
  const deleteData = (id) => {
    Axios.delete(`http://localhost:3000/delete/${id}`).then((res) => {
      alert(name + "has been deleted succesfully");
    });
  };

  const updateForm = (id) => {
    console.log(id);
    Axios.put("http://localhost:3000/update", {
      id: id,
      newName: newName,
    });
  };
  // const filterContent = (Form,searchTerm)=>{
  //   const result= Form.filter(Form)=>Form.
  // }
  // const searchData = (e) => {
  //   const searchTerm = e.target.value;
  //   Axios.get("/posts").then((res) => {
  //     if (res.data.success) {
  //       filterContent(res.data.Form, searchTerm);
  //     }
  //   });
  // };
  return (
    <div className="App">
      <h1>Form</h1>
      <label>Student Name</label>
      <input
        type="text"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <label>Date</label>
      <input
        type="date"
        onChange={(event) => {
          setDate(event.target.value);
        }}
      />
      <label>Age</label>
      <input
        type="number"
        onChange={(event) => {
          setAge(event.target.value);
        }}
      />
      <label>Mobile</label>
      <input
        type="number"
        onChange={(event) => {
          setMobile(event.target.value);
        }}
      />
      <label>Year</label>
      <input
        type="text"
        onChange={(event) => {
          setYear(event.target.value);
        }}
      />
      <label>College</label>
      <input
        type="text"
        onChange={(event) => {
          setCollege(event.target.value);
        }}
      />
      <button onClick={addTodo}>Submit</button>
      {/* <input type="text" placeholder="search data" onChange={searchData} />
      <button>Search</button> */}
      <input
        type="text"
        placeholder="Search By Name ...."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <p className="data">
        {list
          .filter((val) => {
            if (searchTerm == "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((val, key) => {
            return (
              <div
                style={{
                  border: "1px solid black",
                  margin: "10px",
                  display: "block",
                }}
              >
                <h6>{val.name}</h6>
                <h6>{val.date}</h6>
                <h6>{val.age}</h6>
                <h6>{val.mobile}</h6>
                <h6>{val.date}</h6>
                <h6>{val.college}</h6>

                <input
                  type="text"
                  placeholder="update"
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                />
                <br></br>
                <button className="btn" onClick={() => updateForm(val._id)}>
                  Update
                </button>
                <br></br>
                <button className="btn" onClick={() => deleteData(val._id)}>
                  Delete
                </button>
              </div>
            );
          })}
      </p>
    </div>
  );
}

export default App;
