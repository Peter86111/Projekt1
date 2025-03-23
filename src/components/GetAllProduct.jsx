import React, { useEffect, useState } from 'react'
import DeleteCar from './DeleteProduct'
import AddNewCar from './AddNewProduct'
import DeleteProduct from './DeleteProduct'

function GetallProduct(props)
{
    const url = `https://localhost:7012/products`
    const [productsData, setProductsData] = useState([])
    const [productObj, setProductObj] = useState(null)

    useEffect(() =>
    {
        (async () =>
        {
            const request = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!request.ok)
            {
                console.log("Hiba")
                return
            }

            const response = await request.json();
            setCarsData(response.result)
            console.log(response.message)
        })()
    }, [props.count])


    const handleProductObj = (productFromCard) =>
    {
        setProductObj(productFromCard)
    }

    const productElments = productsData.map(
        product =>
        {
            return (
                
                <div 
                onDoubleClick={() => { handleProductObj(car) }} className="card m-3 pt-2" style={{ 'width': 200, 'float': 'left' }} key={car.id}>
                    <div className="card-header">{product.name}</div>
                    <div className="card-body">{product.price}</div>
                    <div className="card-footer">{product.description}</div>
                    <div className="card-footer">{product.category}</div>
                    <div><DeleteProduct productId={product.id} handleCount={props.handleCount} /></div>
                </div>
            )
        }
    )

    return (
        <>
            <AddNewCar handleCount={props.handleCount} carObj={carObj || {}} />
            <div><h2><label>Létrehozott autók:</label></h2>{carElments}</div>
        </>

    )
}

export default GetallCars