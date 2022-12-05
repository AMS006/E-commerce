import { CategoryModel } from "../../models/Category";
import { ProductModel } from "../../models/products";
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
exports.initialData = async(req,res) =>{
    try {
        const category = await CategoryModel.find();
        const products = await ProductModel.find();

        const categoryList = createCategories(category)
        return res.status(200).json({categoryList,products})
    
      } catch (error) {
        return res.status(500).json({message:error.message})
      }
}