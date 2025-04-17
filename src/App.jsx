import React, { useEffect, useState } from 'react';
import { getUsers, createUser } from './api';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(form);
      setForm({ name: '', email: '' });
      fetchUsers();
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1>User Management</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <button type="submit">Add User</button>
      </form>
      <ul>
        {users.map((u, i) => (
          <li key={i}>{u.name} - {u.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
