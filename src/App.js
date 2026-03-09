import { useState } from "react";

function App() {

  const [students] = useState([
    { id: 1, name: "Gagan", email: "gagan@gmail.com", age: 23 },
    { id: 2, name: "Ravi", email: "ravi@gmail.com", age: 24 },
    { id: 3, name: "Arjun", email: "arjun@gmail.com", age: 22 }
  ]);

  return (
    <div>
      <h1>Students Table</h1>

      <table border="1">
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
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default App;