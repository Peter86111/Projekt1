import React, { useState, useEffect } from 'react';
//import UpdateCategory from './UpdateCategory'

function AddNewCategory(props) {
  const [categoryData, setCategorydata] = useState({
    categoryname: "",
    categoryId: "",
  });

  useEffect(() => {
    if (props.categoryObj) {
      setCategorydata({
        categorynamename: props.productObj.categorynamename || '',
        categoryId: props.productObj.categoryId || ''
      });
    }
  }, [props.categoryObj]); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategorydata({ ...categoryData, [name]: value });
  };

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
      console.log("Hiba");
      return;
    }

    const response = await request.json();
    props.handleCount();
    console.log(response.message);
  };

  return (
    <div>
      <h1 className='h1-admin'><label>Új kategória felvétele:</label></h1>
      <form onSubmit={handleSubmit} className=''>
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
        <button type='submit' className='btn btn-success'><i class="bi bi-floppy-fill"></i></button>
      </form>
    </div>
  );
}

export default AddNewCategory;