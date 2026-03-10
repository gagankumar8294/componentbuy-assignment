import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import "./App.css";

function App() {

  const [students, setStudents] = useState([
    { id: 1, name: "Gagan", email: "gagan@gmail.com", age: 23 },
    { id: 2, name: "Ravi", email: "ravi@gmail.com", age: 24 },
    { id: 3, name: "Arjun", email: "arjun@gmail.com", age: 22 }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });

  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      email: student.email,
      age: student.age
    });
    setEditId(student.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.age) {
      alert("All fields are required");
      return;
    }

    if (editId) {

      const updatedStudents = students.map((student) =>
        student.id === editId
          ? { ...student, ...formData, age: Number(formData.age) }
          : student
      );

      setStudents(updatedStudents);
      setEditId(null);

    } else {

      const newStudent = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        age: Number(formData.age)
      };

      setStudents([...students, newStudent]);
    }

    setFormData({
      name: "",
      email: "",
      age: ""
    });
  };

  const handleDelete = (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) return;

    const updatedStudents = students.filter((student) => student.id !== id);

    setStudents(updatedStudents);
  };

  const downloadExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(workbook, "students.xlsx");
  };

  if (loading) {
    return <div className="loading">Loading Students...</div>;
  }

  return (
    <div className="container">

      <h1>Students Table</h1>

      <h2>{editId ? "Edit Student" : "Add Student"}</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) =>
            setFormData({ ...formData, age: e.target.value })
          }
        />

        <button type="submit">
          {editId ? "Update Student" : "Add Student"}
        </button>

      </form>

      <button className="download-btn" onClick={downloadExcel}>
        Download Excel
      </button>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td className="actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default App;