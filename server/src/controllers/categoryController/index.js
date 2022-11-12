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
        const cateogryList = createCategories(category)
        return res.status(200).json({cateogryList})
    }

    return res.status(200).json({message:"No category Found"});
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
};
