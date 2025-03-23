import React from 'react'

function UpdateProduct(props)
{
    const handleProductData = async () =>
    {
        const url = `https://localhost:7012/Product?id=${props.productId}`

        const request = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(props.productData),
            headers: { "Content-type": "Application/json" }

        })

        if (!request.ok)
        {
            console.log("Hiba")
            return
        }

        var response = await request.json()
        console.log(response.message)
        props.handleCount()

    }


    return (
        <button onClick={handleProductData} type='button' className='btn btn-warning'>Módosít</button>
    )
}

export default UpdateProduct;