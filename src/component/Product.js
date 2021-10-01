import React,{useState,useEffect} from 'react';
import NavBar from './Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useHistory } from 'react-router-dom';


const Product=()=> { 
    let history = useHistory();

    const [data, setData] = useState({
        products: []
    })
    const config = {
        headers: {
            'Content-Type':'application/json',
            'Authorization': localStorage.getItem("token")
        }
    }
    const getProducts = () => {
        try {
            axios.get("http://admin-panel-backend-live.herokuapp.com/product/getProducts",config).then((res) => {
                setData({products: res.data})
            })
        } catch(err) {
           
        }
       
    }

    useEffect(() => {
        console.log('inside use')
        getProducts()
    },[])
    return (

        <div className>
          <NavBar/> 
           <Link to = "/addproduct" id="topm" className="btn btn-primary"> Add Product</Link>
            <table id="topm" class="table table-hover">
            <thead>
          <tr>
            <th>Title</th>
            <th>cover pic</th>
            <th>Type</th>
          </tr>
            </thead>
            <tbody>
            {data.products.map(product => (

                <tr>
                  <td>{product.title}</td>
                  <td><img src={product.cover} alt="Item Image"/></td>
                  <td>{product.type}</td>
                  <td><a href={'/viewproduct/'+product._id} className="btn btn-success">View Details</a></td>
                </tr>
                ))}
         

            </tbody>
        </table>
        </div>
    )
}
export default Product;