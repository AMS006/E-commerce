import React,{useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
function AddCategoryModal({open,setOpen,categoriesList,setCategoryParentId,setCategoryType,setCategoryName,handleAddCategorySubmit}) {
    const handleClose = () => {
      setOpen(false);
    };
    const renderCategories = (category) =>{
      const categories = []
  
      for(let cat of category){
        categories.push({
          label:cat.name,
          value:cat._id,
          children:cat.childrens.length > 0 && renderCategories(cat.childrens)
      })
      }
      return categories;
    }

    return (
      <div>
        {open &&<Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Category</DialogTitle>
            <form action="" onSubmit={handleAddCategorySubmit}>
          <DialogContent>
              <div className='flex flex-col gap-2' style={{width:'350px'}}>
                <div className='flex flex-col gap-1 w-full'>
                  <label htmlFor="categoryName">Enter Category Name</label>
                  <input type="text" className='p-1 focus:outline-none border' name="categoryName" placeholder='Enter Category Name' onChange={(e)=> setCategoryName(e.target.value)} id="categoryName" />
                </div>
                <div className='w-full flex flex-col gap-1'>
                  <label htmlFor="selectCategory">Select Parent of Category</label>
                  <select className='w-full p-1 border focus:outline-none' onChange={(e)=> setCategoryParentId(e.target.value)}>
                    <option>Select Category</option>
                   {categoriesList.map((item) =>(
                      <option key={item.value}value={item.value}>{item.name}</option>
                   ))}
                  </select>
                </div>
                <div className='w-full flex flex-col gap-1'>
                  <label htmlFor="selectCategory">Select Type of Category</label>
                  <select className='w-full p-1 border focus:outline-none' onChange={(e)=> setCategoryType(e.target.value)}>
                    <option>Select Type</option>
                    <option value="product">Product</option>
                    <option value="store">Store</option>
                    <option value="pate ">Page</option>
                  </select>
                </div>
              </div>
          </DialogContent>
          <DialogActions>
            <input type="submit" value="Add" className='text-white px-4 py-2 rounded-md cursor-pointer' style={{background:'#3c8dbc'}}/>
          </DialogActions>
          </form>
        </Dialog>}
      </div>
    )
}

export default AddCategoryModal
