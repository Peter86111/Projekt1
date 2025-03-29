import React from 'react'

function DeleteProduct(props) {
    const handleProductId = async () => {
        const url = `https://localhost:7012/cars?id=${props.productId}`

        const request = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!request.ok) {
            console.log("Hiba")
            return
        }

        const response = await request.json()
        props.handleCount()
        console.log(response.message)
    }

    return (
        <div style={styles.container}>
            <button style={styles.button} onClick={handleProductId}>Töröl</button>
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

export default DeleteProduct;