import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import axios from 'axios';
import {useHistory } from 'react-router-dom';
import NavbarLogin from './NavbarLogin';


const LoginPage=()=> { 
    let history = useHistory();

    const [formData,setFormData] = useState({
        email:'',
        password:''
    })
    const { email,password } = formData;
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value})
    
    const onsubmit=async (e) => {
        
            e.preventDefault();
           
            try {

            const newData = {
                email: email,
                password:password
            }

            const config = {
                headers: {
                    'Content-Type':'application/json'
                }
            }
            const body = JSON.stringify(newData);
            const res = await axios.post('http://admin-panel-backend-live.herokuapp.com/user/login',body , config)
            
            //storing token to local storage
            
            localStorage.setItem('token',res.data.token)
         
            //checking user is admin or not
            if(res.data.user.isAdmin) {
                history.push("/product");
            } else {
                alert('Your not admin')
            }
           
            
        } catch(err) {
            if(err.response.status === 400) {
                alert('Username or password are wrong')
                setFormData({
                    email:'',
                    password:''
               })
            }
           
        }
}
    
    return (
        <div className="login">
            <NavbarLogin/>
            <section className="container-fluid bg">
            <section className="row justify-content-center">
            <section className="col-12 col-sm-6 col-md-3"> 
                <div className="container">
                    <form className="form-container" action="login_teacher.php" method="POST">
                        <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                            <input type="email"
                             placeholder="name@gmail.com"
                             required 
                             className="form-control"
                             id="exampleInputEmail1" 
                             name='email'
                             value={email}
                             onChange={e=>onChange(e)}

                             aria-describedby="emailHelp">
                             </input>
                     
                    </div>
                    <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" 
                     placeholder="*********"   
                     required
                     className="form-control" 
                     name='password'
                     value={password}
                     onChange={e=>onChange(e)}
                     
                     id="exampleInputPassword1">
      
                     </input>
                    </div>
                    
                    
                    <button type="submit" className="btn btn-danger btn-block" onClick={(e) => onsubmit(e)}>Log in</button>
                   <hr></hr> <p id="ptext">New User ?<Link to='/register' className="btn">Register</Link>
            </p>
                </form>  
            </div>
          </section>
          </section>
          </section>
        </div>
    )
}

export default LoginPage;
