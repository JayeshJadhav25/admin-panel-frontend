import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import NavBar from './Navbar';

const User=()=> { 

    const [ data, setData ] = useState({
        users:[]
    })

    const getUsers = async() =>{
        try {
            const config = {
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            }
            axios.get("http://admin-panel-backend-live.herokuapp.com/user/get",config).then((res) => {
                setData({users: res.data})
            })
        } catch (err) {
            alert( err );
        }
    }

    useEffect( () =>{
        getUsers();
    },[ getUsers ])
    return (
        <div>
            <NavBar />

            <table id="topm" class="table table-hover">
            <thead>
          <tr>
            <th>Username</th>
            <th>Email</th> 
            <th> Assign </th>
          </tr>
            </thead>
            <tbody>
            {data.users.map(user => (

                <tr>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <Link to={'/assign/'+user._id} className="btn btn-success">Assign Product</Link>
                </tr>
                ))}
             </tbody>
        </table>
        </div>
    )
}
export default User;