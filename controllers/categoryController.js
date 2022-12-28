import Category from "../models/Category.js"


const createCategory = async (req, res) => {
    const category = await Category.create(req.body);
    try {
        res.status(200).redirect(`/courses`)
    } catch (error) { res.status(200).json({ status: `fail`, error }) }

}


export { createCategory  }