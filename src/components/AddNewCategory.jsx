import React, { useState, useEffect } from 'react';

function AddNewCategory(props) {
  // Initialize local state to store form data
  const [categoryData, setCategorydata] = useState({
    categoryname: "",
    categoryId: "",
  });

  // Populate form if editing an existing category
  useEffect(() => {
    if (props.categoryObj) {
      setCategorydata({
        categorynamename: props.productObj.categorynamename || '',
        categoryId: props.productObj.categoryId || ''
      });
    }
  }, [props.categoryObj]);

  // Handle changes in input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategorydata({ ...categoryData, [name]: value });
  };

  // Submit the form data to the backend API
  const handleSubmit = async (event) => {
    const url = `https://localhost:7012/Categories`;
    event.preventDefault();

    const request = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(categoryData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!request.ok) {
      console.log("Hiba"); // Error occurred during request
      return;
    }

    const response = await request.json();
    props.handleCount(); // Trigger parent callback (e.g. refresh list)
    console.log(response.message);
  };

  return (
    <div>
      {/* Form header */}
      <h1 className='h1-admin'><label>Új kategória felvétele:</label></h1>

      {/* Category form */}
      <form onSubmit={handleSubmit}>
        <label>Kategória neve:</label>
        <input
          type='text'
          id='categoryname'
          name='categoryname'
          value={categoryData.categoryname}
          onChange={handleChange}
          className='form-control'
          placeholder='Kategória neve'
        />

        <label>Kategória ID:</label>
        <input
          type='number'
          id='categoryId'
          name='categoryId'
          value={categoryData.categoryId}
          onChange={handleChange}
          className='form-control'
          placeholder='Termék kategória ID'
        />

        {/* Submit button */}
        <button type='submit' className='btn btn-success'>
          <i className="bi bi-floppy-fill"></i>
        </button>
      </form>
    </div>
  );
}

export default AddNewCategory;
