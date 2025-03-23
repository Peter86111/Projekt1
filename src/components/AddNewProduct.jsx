import React, { useState, useEffect } from 'react';

function AddNewProduct(props) {
  const [productData, setProductdata] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (props.productObj) {
      setProductdata({
        name: props.productObj.name || '',
        price: props.productObj.price || '',
        description: props.productObj.description || '',
        category: props.productObj.category || '',
      });
    }
  }, [props.productObj]); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductdata({ ...productData, [name]: value });
  };

  const handleSubmit = async (event) => {
    const url = `https://localhost:7012/products`;
    event.preventDefault();

    const request = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(productData),
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
      <h1 className='h1-admin'><label>Új termék felvétele:</label></h1>
      <form onSubmit={handleSubmit} className=''>
        <label>Termék neve:</label>
        <input
          type='text'
          id='name'
          name='name'
          value={productData.name}
          onChange={handleChange}
          className='form-control'
          placeholder='Termék neve'
        />
        <label>Ár:</label>
        <input
          type='number'
          id='price'
          name='price'
          value={productData.price}
          onChange={handleChange}
          className='form-control'
          placeholder='Termék ára'
        />
        <label>Leírás:</label>
        <input
          type='text'
          id='description'
          name='description'
          value={productData.description}
          onChange={handleChange}
          className='form-control'
          placeholder='Termék leírása'
        />
        <label>Kategória:</label>
        <input
          type='text'
          id='category'
          name='category'
          value={productData.category}
          onChange={handleChange}
          className='form-control'
          placeholder='Termék kategóriája'
        />
        <button type='submit' className='btn btn-success'>Új termék mentése</button>
      </form>
    </div>
  );
}

export default AddNewProduct;
