import { CategoryModel } from "../../models/Category";

const createCategories = (categories,parentId=null) =>{
    let categoriesList = []
    let category;
    if(parentId == null){
       category = categories.filter((cat) => cat.parentId == undefined)
    }
    else{
        category = categories.filter((cat) => cat.parentId == parentId);
    }

    for(let e in category){
        categoriesList.push({
            _id:category[e]._id,
            name:category[e].name,
            createdBy:category[e].createdBy,
            parentId:category[e].parentId,
            childrens: createCategories(categories,category[e]._id)
        })
    }
    return categoriesList
}
exports.addCategory = async (req, res) => {
  try {
    const categoryObj = {
      name: req.body.name,
      createdBy: req.user._id,
      type:req.body?.type
    };
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }
    if(req.file){
      categoryObj.categoryImage = req.file.filename
    }
    const category = await CategoryModel.create(categoryObj);
    return res.status(200).json({ category });
  } catch (error) {
    return res.status(500).json({ message:error.message });
  }
};
exports.getCategory = async (req, res) => {
  try {
    const category = await CategoryModel.find();
    if(category){
        const categoryList = createCategories(category)
        return res.status(200).json({categoryList})
    }

    return res.status(200).json({message:"No category Found"});
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
};
exports.deleteCategory = async(req,res) =>{
  try {
    const category = req.body.list;
    const deletedCategoryList = [];
    if(!category){
      return res.status(400).json({message:"No category Selected"});
    }
    for(let i = 0;i<category.length;i++){
      const deletedCategory = await CategoryModel.findByIdAndDelete(category[i]);
      deletedCategoryList.push(deletedCategory)
    }
    return res.status(200).json({message:"Categories Deleted Successfully", deletedCategoryList});
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}
exports.updateCategory = async(req,res) =>{
  try {
    const data = req.body
    for(let i = 0;i<data.length;i++){
      const id = data[i].value;
      const {name,parentId,type} = data[i];
      const updatedList = await CategoryModel.findByIdAndUpdate(id,{name,parentId,type});
    }

    return res.status(200).json({message:"Updated Successfully"})
  } catch (error) {
    return res.status(500).json({message:error.message})
    
  }
}
