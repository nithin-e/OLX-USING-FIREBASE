import React, {useContext,useEffect,useState} from 'react';
import { collection, getDocs } from "firebase/firestore";
import Heart from '../../assets/Heart';
import {  FirebaseContext } from "../../store/firebaseContest";
import './Post.css';
import { postContext } from '../../store/postContest';
import { useHistory } from 'react-router-dom';


function Posts() {
   

     const { db } = useContext(FirebaseContext); 
    const [product,SetProduct]= useState([])
    // const [setPostDetails]=useContext(postContext)
    const { setPostDetails } = useContext(postContext);
    const history=useHistory()

    useEffect(()=>{
      console.log("hiiiiiiiii");
      
     const fetchProduct= async()=>{
    try {
      console.log("hiiiii66666666666iiii");
      const querySnapshot = await getDocs(collection(db, "items"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data(), 
      }));
      SetProduct(productList);
      

    } catch (error) {
      console.log('shit',error);
      
      console.error("Error fetching products:", error);
 }
     }
     fetchProduct()

    },[db])
    console.log('kitty brooooo',product);
    

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

        {product.map((product) => (
            <div className="card" key={product.id} onClick={()=>{
                 setPostDetails(product)
                 history.push('/View')
            }}>
              
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.image || "../../../Images/placeholder.jpg"} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{new Date(product.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}


        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
