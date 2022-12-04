import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {IoClose} from 'react-icons/io5';
import Slide from '@mui/material/Slide';
import { useDispatch } from 'react-redux';
import {updateCategory,getCategory} from '../../../redux_1/category/category.action'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateModal(props) {
  const {
    open,
    setOpen,
    categoriesList,
    checkedCategoryList,
    setCheckedCategoryList,
    expandedCategoryList,
    setExpandedCategoryList,
    setChecked} = props
  const dispatch = useDispatch()
  const handleClose = () => {
    setOpen(false);
  };
  const handleCategorySubmit = () =>{

    setOpen(false);
    const updateList = [...checkedCategoryList,...expandedCategoryList];
    console.log(updateList);
    dispatch(updateCategory(updateList)).then(()=>{
      dispatch(getCategory());
    });
    setChecked([]);

  }
  const handleUpdateCategory = (key,value,index,type) =>{
    if(type=== "checked"){
      let updatedList = checkedCategoryList.map((item,_index) => index === _index ? {...item,[key]: value }: item )
      setCheckedCategoryList(updatedList);
    }
    else if(type === "expanded"){
        let updatedList = expandedCategoryList.map((item,_index) => index === _index ? {...item,[key]: value }: item )
        setExpandedCategoryList(updatedList);
    }
  }
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <IoClose />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Update Category
            </Typography>
            <button className='bg-white text-blue-500 px-3 py-1' onClick={handleCategorySubmit}>
              Update
            </button>
          </Toolbar>
        </AppBar>
        <List>
          <h2 className="text-xl font-semibold py-2 text-center">Checked Category List</h2>
        {checkedCategoryList?.length==0?<p className='text-center py-2'>No Category Selected</p>:
            <div className='flex gap-4 flex-col items-center '>
              {checkedCategoryList.map((category,index) =>(
                <div className='flex gap-3 items-center' key={index}>
                  <div>
                    <input type="text" value={category.name} id="name" placeholder='Enter Category Name' className='border px-2 py-1 focus:outline-none' onChange={(e)=> handleUpdateCategory('name',e.target.value,index,"checked")}/>
                  </div>
                  <div>
                    <select className='p-2 w-52 focus:outline-none' onChange={(e)=> handleUpdateCategory('parentId',e.target.value , index,"checked")}>
                      <option value="">Select ParentId</option>
                      {categoriesList.map((item,index) =>(
                        <option value={item.value} key={index}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select className='p-2 w-52 focus:outline-none' onChange={(e) => handleUpdateCategory('type',e.target.value,index,"checked")}>
                      <option value="">Select Type</option>
                      <option value="product">Product</option>
                      <option value="page">Page</option>
                      <option value="store">Store</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>}
            <h2 className="text-xl font-semibold py-2 text-center">Expanded Category List</h2>
            {expandedCategoryList?.length==0?<p className='text-center py-2'>No Category Expanded</p>:
            <div className='flex gap-4 flex-col items-center'>
              {expandedCategoryList.map((category,index) =>(
                <div className='flex gap-3 items-center' key={index}>
                  <div>
                    <input type="text" defaultValue={category.name} id="name" placeholder='Enter Category Name' className='border px-2 py-1 focus:outline-none' onChange={(e)=> handleUpdateCategory('name',e.target.value,index,"expanded")}/>
                  </div>
                  <div>
                    <select className='p-2 w-52 focus:outline-none' onChange={(e)=> handleUpdateCategory('parentId',e.target.value , index,"expanded")}>
                      <option value="">Select ParentId</option>
                      {categoriesList.map((item,index) =>(
                        <option value={item.value} key={index}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select className='p-2 w-52 focus:outline-none' onChange={(e) => handleUpdateCategory('type',e.target.value,index,"expanded")}>
                      <option value="">Select Type</option>
                      <option value="product">Product</option>
                      <option value="page">Page</option>
                      <option value="store">Store</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>}
        </List>
      </Dialog>
    </div>
  );
}