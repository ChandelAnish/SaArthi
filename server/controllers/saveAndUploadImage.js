const { response } = require('express')
const {uploadOnCloudinary} = require('../cloudinaryFunctions/cloudinaryFunctions')


// saving image in public folder
const saveImage = async (req, res) => {
    if(req.file.path){
        console.log(req.file.filename)
        return res.status(200).json({msg: "image saved successfully", filePath: req.file.filename})
    }
    return res.status(409).json({msg: "failed to save image"})
}

// //upload image to cloudinary
// const uploadImage = async (filePath) => {
//     try {
//         console.log(filePath)
//         const imgURL = await uploadOnCloudinary(filePath)
//         // console.log(imgURL)

//         // res.status(200).json(imgURL);
//         return imgURL
//     } catch (error) {
//         res.status(402).json({msg: "failed to upload image"});
//         console.log(error)
//     }
// }

// module.exports = {saveImage, uploadImage};
module.exports = {saveImage};
