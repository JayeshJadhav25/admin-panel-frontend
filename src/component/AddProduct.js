import React,{useState} from 'react';
import NavBar from './Navbar';
import {useHistory } from 'react-router-dom';

import axios from 'axios';

const AddProduct=()=> { 
    let history = useHistory();

    const [formData,setFormData] = useState({
        title:'',
        type:'',
        desc:'',
        cover:'',
        price:'',
        rating:'',
    })
    const { title,type,desc,cover,price,rating} = formData;
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value})
    
    const onFileChange = (e) =>{
        console.log(e.target.files[0])
        setFormData({...formData,cover:e.target.files[0]})
    }


    const onsubmit=async (e) => {
        try {
            e.preventDefault();
        
            var bodyFormData = new FormData();

            bodyFormData.append("title",title)
            bodyFormData.append("type",type)
            bodyFormData.append("description",desc)
            bodyFormData.append("files",cover)
            bodyFormData.append("price",price)
            bodyFormData.append("rating",rating)


            console.log('----')
            const config = {
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            }
            
            const res = await axios.post('http://admin-panel-backend-live.herokuapp.com/product/addProduct',bodyFormData , config)

            history.push('/product')
        } catch(err) {
            if(err.response.status === 400) {
                alert('server error')
            } 
        }
    }

    return (
        <div>
        <NavBar />
        <section class="container-fluid bg">
        <section class="row justify-content-center">
          <section class="col-12 col-sm-6 col-md-3"> 
            <div class="container">
                <form class="form-container" action="login_teacher.php" method="POST">
                    <div class="form-group">
                    <label for="exampleInputEmail1">Title</label>
                    <input type="text"
                     required 
                     class="form-control"
                     id="exampleInputEmail1" 
                     name='title'
                     value={title}
                     onChange={e=>onChange(e)}

                     >
                     </input>
                    </div>
                    <div class="form-group">
                    <label for="exampleInputPassword1">Type</label>
                    <input type="text"   
                     required
                     class="form-control" 
                     name='type'
                     value={type}
                     onChange={e=>onChange(e)}
                     id="exampleInputPassword1">
                    </input>
                     </div>

                     <div class="form-group">
                        <label for="exampleInputPassword1">Description</label>
                        <textarea   
                            required
                            class="form-control" 
                            name='desc'
                            value={desc}
                            onChange={e=>onChange(e)}
                            id="exampleInputPassword1">
                        </textarea>
                      </div>
                    
                        <label for="img">Select image:</label>
                        <input 
                            type="file" 
                            id="img" 
                            name="itemImage"
                            onChange = {e => onFileChange(e)}
                            accept="image/*"
                            >
                        </input> 
                        
                        <div class="form-group">
                            <label for="exampleInputPassword1">Price</label>
                            <input type="text"   
                            required
                            class="form-control" 
                            name='price'
                            value={price}
                            onChange={e=>onChange(e)}
                            id="exampleInputPassword1">
                        </input>
                         </div>

                         <div class="form-group">
                            <label for="exampleInputPassword1">Rating</label>
                            <input type="text"   
                            required
                            class="form-control" 
                            name='rating'
                            value={rating   }
                            onChange={e=>onChange(e)}
                            id="exampleInputPassword1">
                            </input>
                          </div>
                  <hr></hr>
                  <button type="submit" className="btn btn-success btn-block" onClick={(e) => onsubmit(e)}>Add Product</button>

                  </form>  
            </div>
          </section>
          </section>
          </section>
        
        </div>
    )
}

export default AddProduct;