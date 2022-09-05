import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout'
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { getProductDetailsById } from '../../features/productSlice';
import { MaterialButton } from "../../components/MaterialUI";
import "./style.css";
// import { generatePublicImageUrl } from '../../apiConfig';
import { addToCart } from '../../features/cartSlice';
import {useNavigate} from 'react-router-dom';

/**
* @author
* @function ProductDetailsPage
**/

export const ProductDetailsPage = (props) => {

const {productId} = useParams();
const params = useParams;
console.log(params);
const navigate = useNavigate();
const {productDetails} = useSelector(state=>state.product);
// console.log(params);
// console.log(productDetails);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProductDetailsById({productId}))
  },[])

  if(productDetails === null){
    return null;
  }

  const onAddToCartClicked = ()=>{
    const {_id,name,price} = productDetails;
    const img = productDetails.productPictures[0].img;
    dispatch(addToCart({_id,name,price,img})).then(navigate('/cart'));
  }
  return (
    <Layout>
      {/* <div>{product.productDetails.name}</div> */}
      <div className="productDescriptionContainer">
        <div className="d-flex">
          <div className="verticalImageStack">
            {
              productDetails.productPictures.map((thumb, index) => 
              <div className="thumbnail" key = {index}>
                <img src={thumb.img} alt={thumb.img} />
              </div>
              )
            }
            {/* <div className="thumbnail active">
              {
                product.productDetails.productPictures.map((thumb, index) => 
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />)
              }
            </div> */}
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img src={productDetails.productPictures[0].img} alt={`${productDetails.productPictures[0].img}`} />
            </div>

            {/* action buttons */}
            <div className="d-flex">
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: '5px'
                }}
                onClick = {onAddToCartClicked}
                icon={<IoMdCart />}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: '5px'
                }}
                icon={<AiFillThunderbolt />}
              />
            </div>
          </div>
        </div>
        <div>

          {/* home > category > subCategory > productName */}
          <div className="breed">
            <ul>
              <li><a href="#">Home</a><IoIosArrowForward /></li>
              <li><a href="#">Mobiles</a><IoIosArrowForward /></li>
              <li><a href="#">Samsung</a><IoIosArrowForward /></li>
              <li><a href="#">{productDetails.name}</a></li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
              <p className="productTitle">{productDetails.name}</p>
            <div>
              <span className="ratingCount">4.3 <IoIosStar /></span>
              <span className="ratingNumbersReviews">72,234 Ratings & 8,140 Reviews</span>
            </div>
            <div className="extraOffer">Extra <BiRupee />4500 off </div>
            <div className="d-flex priceContainer">
              <span className="price"><BiRupee />{productDetails.price}</span>
              <span className="discount" style={{ margin: '0 10px' }}>22% off</span>
              {/* <span>i</span> */}
              </div>
            <div>
              <p style={{ 
                color: '#212121', 
                fontSize: '14px',
                fontWeight: '600' 
                }}>Available Offers</p>
              <p style={{ display: 'flex' }}>
                <span style={{
                  width: '100px',
                  fontSize: '12px',
                  color: '#878787',
                  fontWeight: '600',
                  marginRight: '20px'
              }}>Description</span>
              <span style={{
                fontSize: '12px',
                color: '#212121',
              }}>{productDetails.description}</span>
              </p>
            </div>
          </div>
          

        </div>
      </div>
    </Layout>
  )

}

