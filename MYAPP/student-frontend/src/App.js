import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");

  // Fetch students
  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  // Add student
  const addStudent = () => {
    if (!name) return;

    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((student) => {
        setStudents([...students, student]);
        setName("");
      });
  };

  // Delete student
  const deleteStudent = (id) => {
    fetch(`http://localhost:5000/students/${id}`, {
      method: "DELETE",
    }).then(() => {
      setStudents(students.filter((s) => s.id !== id));
    });
  };

  return (
    <div className="container">
      <h2>Student Management System</h2>

      <input
        type="text"
        placeholder="Enter student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addStudent}>Add Student</button>

      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name}
            <button onClick={() => deleteStudent(student.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
