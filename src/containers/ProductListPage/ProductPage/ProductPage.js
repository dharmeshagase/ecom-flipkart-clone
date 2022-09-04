import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductPage } from '../../../features/pageSlice';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../components/UI/Card';
import { Link } from 'react-router-dom';

/**
* @author
* @function ProductPage
**/

const ProductPage = (props) => {

    const dispatch = useDispatch();
    const { page } = useSelector(state => state.page);
    useEffect(() => {
        // console.log("in productPage");
        dispatch(getProductPage(props.queryParams));

    }, [])
    // console.log(page);
    return (

        <>
            {page ?
                <div style={{ margin: '0 10px' }}>
                    <h3>{page.title}</h3>
                    <Carousel
                        autoPlay = {true}
                        infiniteLoop = {true}
                        interval = {2000}
                        showThumbs={false}
                        showStatus={false}>
                        {
                            page.banners && page.banners.map((banner, index) =>
                                <Link
                                    style={{ display: 'block' }}
                                    key={index}
                                    to={banner.navigateTo}>
                                    <img src={banner.img} alt="" />
                                </Link>)
                        }
                    </Carousel>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        margin : '10px 0'
                    }}>
                        {page.products && page.products.map((product, index) =>
                            <Card key={index}
                                style={{
                                    width: '400px',
                                    height: '200px',
                                    margin: '5px',
                                }}>
                                <img style={{ width: '100%',height:'100%' }} src={product.img} alt="" />
                            </Card>
                        )}
                    </div>
                </div>
                : null}

        </>
    )
}

export default ProductPage;
