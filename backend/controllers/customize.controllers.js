import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../models/user.model.js"

export const customizeAssistant = async (req, res) => {
  try {
    const { name } = req.body
    const userId = req.userId
    let imageUrl = ""

    if (req.file) {
      imageUrl = await uploadOnCloudinary(req.file.path)
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        assistantName: name,
        assistantImage: imageUrl,
      },
      { new: true }
    ).select("-password")

    return res.status(200).json(updatedUser)
  } catch (error) {
    return res.status(500).json({ message: "Customize error", error })
  }
}
