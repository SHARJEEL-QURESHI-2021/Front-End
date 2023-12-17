// components/AddStudentForm.js
"use client"
import React, { useState } from 'react';

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('file', formData.file);

    try {
      const response = await fetch('/api/addStudent', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleInputChange} /><br />
      <input type="number" name="age" placeholder="Age" onChange={handleInputChange} /><br />
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} /><br />
      <input type="file" name="file" onChange={handleFileChange} /><br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddStudentForm;
