class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword ? 
        {
            name:{
                $regex: this.queryStr.keyword,
                $options:"i"
            }
        }:{}
        this.query = this.query.find({...keyword}); 
        // console.log(this);
        return this;
    }
    filter(){
        const removeFields = ["search","page","limit"];

        const queryCopy =  {...this.queryStr};

        removeFields.forEach((key) => delete queryCopy[key]);
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        // console.log(queryStr);
        this.query = this.query.find(JSON.parse(queryStr));
     
        return this;
    }
    pagination(){
        const currentPage = Number(this.queryStr.page) || 1
        const resultPerPage = 8;

        const skipPages = resultPerPage * (currentPage -1);

        this.query = this.query.limit(resultPerPage).skip(skipPages)

        return this;
    }
}
module.exports = ApiFeatures;