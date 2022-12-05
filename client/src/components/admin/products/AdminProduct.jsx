import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ProductViewModal from './ProductViewModal';
import { useSelector } from 'react-redux';
import {MdDelete,MdEdit} from 'react-icons/md'
import {AiFillEye} from 'react-icons/ai'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1a2225',
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: 15
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function AdminProduct() {
  const products = useSelector((state) => state.product.products)

  const [productViewModalOpen,setProductViewModalOpen] = useState(false);
  const [productDetails,setProductDetails] = useState(null);

  const handleProductViewModalOpen = (product) =>{
    setProductDetails(product);
    setProductViewModalOpen(true);
  }
  return (
    <div className='ml-48 mr-6'>
      <ProductViewModal open={productViewModalOpen} setOpen = {setProductViewModalOpen} productDetails = {productDetails} />
      <div className='flex justify-between items-center'>
        <h1 className='font-semibold text-2xl py-4'>Manage Products</h1>
        <button className='px-2 py-1 rounded text-white' style={{background:'#3c8dbc'}}>+ Add Product</button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell align='center'>Price</StyledTableCell>
              <StyledTableCell align='center'>Category</StyledTableCell>
              <StyledTableCell align='center'>Rating</StyledTableCell>
              <StyledTableCell align='center'>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <StyledTableRow key={product.name}>
                <StyledTableCell component="th" scope="row">
                  {product.name}
                </StyledTableCell>
                <StyledTableCell align='center'>₹{product.price}</StyledTableCell>
                <StyledTableCell align='center'>xyz</StyledTableCell>
                <StyledTableCell align='center'>{product.rating}</StyledTableCell>
                <StyledTableCell align='center'>
                  <div className='flex gap-2 items-center justify-center'>
                    <button className='border px-1 pr-2 py-1 flex items-center rounded-md  text-white bg-blue-600' style={{gap:'1px'}} onClick={() =>handleProductViewModalOpen(product)}>
                      <AiFillEye className='text-white' style={{color:'white', fontSize:'14px'}}/>
                      <span className='' >View</span>
                    </button>
                    <button className='border px-2 py-1 flex items-center rounded-md  bg-green-600 text-white' style={{gap:'1px'}}>
                      <MdEdit className='text-white' style={{color:'white', fontSize:'14px'}}/>
                      <span>Edit</span>
                    </button>
                    <button className='border px-2 py-1 flex items-center rounded-md  bg-red-600 text-white' style={{gap:'1px'}}>
                      <MdDelete className='text-white' style={{color:'white', fontSize:'14px'}}/>
                      <span>Delete</span>
                    </button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
