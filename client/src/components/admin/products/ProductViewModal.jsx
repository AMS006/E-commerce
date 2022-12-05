import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import {IoClose} from 'react-icons/io5';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <IoClose />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ProductViewModal(props) {
    const {
        open,
        setOpen,
        productDetails
    } = props
  const handleClose = () => {
    setOpen(false);
  };
  console.log(productDetails.productImages);
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Product Details
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className='grid grid-cols-2 gap-6'>
            <div >
                <h2 className='font-semibold'>Product Name</h2>
                <p className=''>{productDetails.name}</p>
            </div>
            <div >
                <h2 className='font-semibold'>Product Price</h2>
                <p className=''>₹{productDetails.price}</p>
            </div>
            <div >
                <h2 className='font-semibold'>Product Stock</h2>
                <p className=''>{productDetails.stock}</p>
            </div>
            <div >
                <h2 className='font-semibold'>Product Category</h2>
                <p className=''>₹{productDetails.price}</p>
            </div>
            <div className='col-span-2'>
                <h2 className='font-semibold'>Product Description</h2>
                <p className='text-sm'>{productDetails.description}</p>
            </div>
            <div className='col-span-2'>
                <h2 className='font-semibold py-4'>Product Images</h2>
                <div className=' flex items-center gap-2 flex-wrap'>
                    {productDetails.productImages.map((image) =>(
                        <div className='h-36 w-auto'>
                            <img src={`http://localhost:4000/public/${image.img}`} className='w-full h-full'/>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}