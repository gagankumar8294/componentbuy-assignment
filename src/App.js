import { useState } from "react";

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

  const [editId, setEditId] = useState(null);

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

  return (
    <div style={{ padding: "20px" }}>

      <h1>Students Table</h1>

      <h2>Add Student</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>

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

      <table border="1" cellPadding="10">

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
              <td>
                <button onClick={() => handleEdit(student)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(student.id)}>
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