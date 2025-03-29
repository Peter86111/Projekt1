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
    const url = `https://localhost:7012/Products`;
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
    <div className="bg-dark" style={styles.container}>
      <h1 className='h1-admin' style={styles.title}><label>Új termék felvétele:</label></h1>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Termék neve:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={productData.name}
            onChange={handleChange}
            placeholder='Termék neve'
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Ár:</label>
          <input
            type='number'
            id='price'
            name='price'
            value={productData.price}
            onChange={handleChange}
            placeholder='Termék ára'
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Leírás:</label>
          <input
            type='text'
            id='description'
            name='description'
            value={productData.description}
            onChange={handleChange}
            placeholder='Termék leírása'
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Kategória:</label>
          <input
            type='text'
            id='category'
            name='category'
            value={productData.category}
            onChange={handleChange}
            placeholder='Termék kategóriája'
            style={styles.input}
          />
        </div>

        <button style={styles.button} onSubmit={handleSubmit}>Új termék mentése</button>
    </div>
  );
}

// Stílusok
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    textAlign: "center",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    width: "250px",
  },
  button: {
    display: "block",
    margin: "0 auto",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    textAlign: "center",
  },
};

export default AddNewProduct;
