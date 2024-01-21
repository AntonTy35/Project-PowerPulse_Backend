const { User } = require("../../models/user");

const updateUserProfile = async (req, res) => {
  try {
    const { _id } = req.user;
    const updates = req.body;
    
    if (req.file) {
      updates.avatarURL = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(_id, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateUserProfile;
