
import mongoose from "mongoose";
import slugify from "slugify";

const Schema = mongoose.Schema;
const courseSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        unique: true
    },
    createdTime: {
        type: Date,
      default:Date.now
    },
    slug:{
        type: String,
        unique: true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:`Category`
    }, 
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:`User`
    }

});

courseSchema.pre(`validate`,function(next){
    this.slug=slugify(this.name,{
        lower:true,
        strict:true
    })
    next();
})
const Course=mongoose.model('Course',courseSchema)
export default Course;