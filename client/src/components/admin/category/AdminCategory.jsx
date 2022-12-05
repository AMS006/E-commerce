import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory, addCategory, deleteCategory } from '../../../redux_1/category/category.action';
import CheckboxTree from 'react-checkbox-tree'
import { useState } from 'react';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
//React-Icons
import { MdUpdate } from 'react-icons/md'
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
} from 'react-icons/io'

//Importing Modals
import AddCategoryModal from './AddCategoryModal';
import UpdateModal from './UpdateModal';

function AdminCategory() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [addCategoryModalOpen, setaddCategoryModalOpen] = useState(false);
  const [updateCategoryModalOpen, setUpdateCategoryModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState();
  const [categoryParentId, setCategoryParentId] = useState();
  const [categoryType, setCategoryType] = useState();
  const [checkedCategoryList, setCheckedCategoryList] = useState([]);
  const [expandedCategoryList, setExpandedCategoryList] = useState([]);

  const categories = useSelector((state) => state.category.category);
  // useEffect(() => {
  //   dispatch(getCategory());
  // }, [dispatch])

  //Function
  const renderCategories = (category) => {
    const categories = []
    for (let cat of category) {
      categories.push({
        label: cat.name,
        value: cat._id,
        children: cat.childrens.length > 0 && renderCategories(cat.childrens)
      })
    }
    return categories;
  }
  const generateCategoryList = (category, list = []) => {
    for (let cat of category) {
      list.push({
        name: cat.name,
        parentId: cat.parentId,
        value: cat._id,
        type: cat?.type
      })
      cat.childrens.length > 0 && generateCategoryList(cat.childrens, list)
    }
    return list;
  }
  const generateCheckedAndUpdateCategoryList = () => {
    const categoryList = generateCategoryList(categories);
    const checkedCategory = [];
    const expandedCategory = [];
    if (checked.length > 0) {
      checked.forEach((id) => {
        const category = categoryList.find((item) => item.value === id);
        category && checkedCategory.push(category);
      })
    }
      if (expanded.length > 0) {
        expanded.forEach((id) => {
          const category = categoryList.find((item) => item.value === id);
          category && expandedCategory.push(category);
        })
      }
      setCheckedCategoryList(checkedCategory);
      setExpandedCategoryList(expandedCategory);
    }
    const handleAddCategorySubmit = (e) => {
      e.preventDefault()
      if (categoryType)
        dispatch(addCategory({ categoryName, categoryParentId, categoryType }));
      else
        dispatch(addCategory({ categoryName, categoryParentId }));

      setaddCategoryModalOpen(false);
      setCategoryParentId("");
      setCategoryType("");
      setCategoryName("");
    }
    const handleDeleteCategory = (e) => {
      e.preventDefault();
      if (checked.length > 0) {
        dispatch(deleteCategory(checked)).then(() => {
          dispatch(getCategory())
        });
      }
    }
    const handleUpdateCategory = (e) => {
      e.preventDefault();
      generateCheckedAndUpdateCategoryList();
      setUpdateCategoryModalOpen(true);

    }
    const handleUpdateCategorySubmit = (e) => {
      e.preventDefault();

    }
    let categoriesList;
    if (categories) {
      categoriesList = generateCategoryList(categories);
    }
    return (
      <div className='ml-44'>
        {categories && <AddCategoryModal
          open={addCategoryModalOpen}
          setOpen={setaddCategoryModalOpen}
          categoriesList={categoriesList}
          setCategoryName={setCategoryName}
          setCategoryParentId={setCategoryParentId}
          setCategoryType={setCategoryType}
          handleAddCategorySubmit={handleAddCategorySubmit}
        />}
        {categories && <UpdateModal
          open={updateCategoryModalOpen}
          setOpen={setUpdateCategoryModalOpen}
          categoriesList={categoriesList}
          checkedCategoryList={checkedCategoryList}
          setCheckedCategoryList={setCheckedCategoryList}
          expandedCategoryList={expandedCategoryList}
          setExpandedCategoryList={setExpandedCategoryList}
          handleUpdateCategorySubmit={handleUpdateCategorySubmit}
          setChecked={setChecked}
        />}
        <div className='flex justify-between items-center pt-2 px-3 pb-3'>
          <h1 className='text-left pt-3 pb-1  text-2xl font-semibold'>Manage Categories</h1>
          <div className='flex gap-2'>
            <button className='border  py-1 px-2 text-white rounded-md flex items-center' style={{ background: '#3c8dbc' }} onClick={() => setaddCategoryModalOpen(true)}><IoIosAdd /> Add</button>
            <button className='border py-1 px-2 text-white bg-green-400 rounded-md flex items-center gap-1' onClick={handleUpdateCategory}><MdUpdate /> Update</button>
            <button className='border py-1 px-2 text-white bg-red-500 rounded-md flex items-center' onClick={handleDeleteCategory}><IoIosTrash /> Delete</button>
          </div>
        </div>
        <div className='ml-5'>
          {
            categories &&
            <CheckboxTree
              nodes={renderCategories(categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          }
        </div>
      </div>
    )
  }

  export default AdminCategory
