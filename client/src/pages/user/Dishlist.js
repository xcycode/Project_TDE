import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import CartContext from '../../context/CartProvider';
import axios from 'axios'
import { GET_DISH_LIST } from '../../api/apiURL';
import TopNav from '../../components/TopNav';
import ProductCard from './ProductCard'
import Footer from './Footer';

const Dishlist = () => {
    let content = null;
    let params = useParams();
    const navigate = useNavigate();

    const storename = params.resname;
    const [product, setProduct] = useState('');

    const { storeName, getStoreName } = useContext(CartContext)

    useEffect(() => {
        axios.post(GET_DISH_LIST,
            JSON.stringify({ storename }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then(response => {
                setProduct(response.data)
                if (storename === storeName) {

                }
                getStoreName(storename)
            })
            .catch((error) => console.log(error))
    }, [GET_DISH_LIST]);

    if (product) {
        const Product = product.msg

        content =
            Product.map((item) =>
                <ProductCard
                    products={item}
                    key={item.Name}
                />
            )
    }

    return (
        <div>
            <TopNav NavStyle={"userDishlist"}/>
            <Container>
                <Row className="g-4 mt-1 mb-2 mx-1">
                    <h1>{storename}</h1>
                </Row>
                <Row >
                    {content}
                </Row>
            </Container>
            <Footer buttontype={"dishlist"} tocart={() => navigate("/cart")} />
        </div>
    )
}

export default Dishlist
