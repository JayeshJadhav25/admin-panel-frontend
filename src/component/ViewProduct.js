import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router';
import NavBar from './Navbar';

const ViewProduct = () =>{
    const id = useParams()

      const [data, setData] = useState({
          products: [],
      })

      const getProduct = () => {
        const config = {
            headers: {
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem("token")
            }
        }
        axios.get("http://admin-panel-backend-live.herokuapp.com/product/getProductById/"+id.id,config).then((res) => {
            setData({products: res.data})
        })
    }

    useEffect(() => {
        getProduct()
    },[])

    return (
        <div>
        <NavBar />
        <div className="row">
            <div className="col-6">
                <img id="imaged" src={data.products.cover}/>
                
            </div>

            <div id='leftside' className="col-6">
                <b>Title : </b>{data.products.title} <br/>
                <b>Type : </b> { data.products.type} <br/>
                <b>Description : </b> { data.products.description} <br/>
                <b>price : </b> { data.products.price} <br/>
                <b>rating : </b> { data.products.rating} <br/>
            </div>
        </div>
        </div>
        
    )

}
export default ViewProduct;
