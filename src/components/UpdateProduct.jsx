import React from 'react'
//import { div } from 'three/tsl'

function UpdateProduct(props) {
    const handleProductData = async () => {
        const url = `https://localhost:7012/Product?id=${props.productId}`

        const request = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(props.productData),
            headers: { "Content-type": "Application/json" }

        })

        if (!request.ok) {
            console.log("Hiba")
            return
        }

        var response = await request.json()
        console.log(response.message)
        props.handleCount()
    }

    return (
        <div style={styles.container}>
            <button style={styles.button} onClick={handleProductData} type='button'>Módosít</button>
        </div>
    )
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

export default UpdateProduct;