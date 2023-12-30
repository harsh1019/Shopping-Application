import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/form/CategoryForm'
import {Modal} from "antd";
const CreateCategory = () => {

  const [categories,setCategories]  = useState([]);
  const [name,setName] = useState("")
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedName] = useState("")
  // handleform
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
          const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/create-category`,{name})
          if(data?.success){
            toast.success(`${name} is created`)
            getAllcategory();
          }else{
            toast.error(data.message);
          }

    }catch(err){
      console.log(err);
      toast.error("something went wrong in input form")
    }
  }

  // get all cat
  const getAllcategory = async () => {
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category`)
      if(data?.success){
        setCategories(data?.category)
      }

    } catch(err){
      console.log(err);
      toast.error('Something went wrong in getting categories');
    }
  }

  useEffect(() => {
        getAllcategory();
  },[]);


 const handleUpdate = async (e) => {
  e.preventDefault();
  try{
    const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/update-category/${selected._id}`,
      { name: updatedName }
    ).catch((err) => {
      console.log(err);
    });


    if (data?.success) {
      toast.success(`${updatedName} is updated`);
      setSelected(null);
      setUpdatedName("");
      setOpen(false);
      getAllcategory();
    } else {
      toast.error(data.message);
    }
  } catch(err){
    console.log(err);
    toast.error("something went wrong")
  }
 }


 const handleDelete = async (pId) => {
   try{
         const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/delete-category/${pId}`);

         if(data.success){
          toast.success('Category is deleted');
          getAllcategory();
         }
         else{
          toast.error(data.message);
         }
   }catch(err){
       toast.error("something went wrong")
   }
 }

  return (
    <Layout title={"Dashboard - createCategory"}>
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Manage Category</h1>
          <div className='p-3 w-50'>
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
          </div>
          <div className='w-75'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Name</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody>
                
                  {
                    categories?.map((c) => (
                      <>
                     <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                        {console.log(c.name)}
                          <button
                            className="btn btn-primary ms-2"

                            onClick={() => {
                              setOpen(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                      </>
                    ))
                  }
               
              </tbody>

            </table>
          </div>

          <Modal onCancel={() => setOpen(false)} footer={null} open={open} >
            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
          </Modal>
        
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default CreateCategory