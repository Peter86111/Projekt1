import React from 'react'

function DeleteProduct(props)
{
    const handleProductId = async () =>
    {
        const url = `https://localhost:7012/cars?id=${props.productId}`

        const request = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!request.ok)
        {
            console.log("Hiba")
            return
        }

        const response = await request.json()
        props.handleCount()
        console.log(response.message)
    }

    return (
        <div><button className='btn btn-danger' onClick={handleProductId}>Töröl</button></div>
    )
}

export default DeleteProduct