import React,{useState,useEffect} from 'react';
import NavBar from './Navbar';
import {useParams} from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Assign = () =>{ 
    const id = useParams()

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
        axios.get("http://admin-panel-backend-live.herokuapp.com/product/getProducts",config).then((res) => {
            setData({products: res.data})
        })
    }

    useEffect(() => {
        console.log('inside use')
        getProducts();
    },[])

    const assignProduct = async(e,key) =>{
        e.preventDefault();
        const body = {
            pid: key
        }
        try {
            const res = await axios.put(`http://admin-panel-backend-live.herokuapp.com/product/assignProduct/${ id.id }`,body);
            alert( "Product assigned successfully..!!" )
        } catch (err) {
            if(err.response.status === 400) {
                alert('Product Already Assigned')
                
            }
        }
    }

    return (

        <div className>
          <NavBar/> 
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
                  <td><button onClick = { (e) => { assignProduct(e,product._id)} } className="btn btn-success"> Assign </button></td>
                </tr>
                ))}
         

            </tbody>
        </table>
        </div>
    )
}

export default Assign;
