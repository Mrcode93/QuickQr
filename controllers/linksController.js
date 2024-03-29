const Link = require("../models/linksModel");

exports.createLink = async (req, res) => {
  const { id, linksData } = req.body;

  // Check if linksData is provided
  if (!linksData) {
    return res.status(400).json({ message: "يجب عليك تقديم روابط" });
  }

  // Create an array of objects with 'key' and 'value' from the request body
  const links = Object.keys(linksData).map((key) => ({
    key: key,
    value: linksData[key],
  }));

  try {
    // Check if the user already has links saved
    const user = await Link.findOne({ userId: id });
    if (user) {
      console.log("User already exists");
      return res.status(401).json({ message: "لقد قمت بحفظ روابطك مسبقا !" });
    }

    const link = new Link({
      userId: id,
      links,
    });

    const newLink = await link.save();
    res.status(201).json({ newLink, message: "! تم حفظ روابطك بنجاح " });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "حدث خطأ في حفظ روابطك ، حاول مرة اخرى" });
  }
};

exports.getLinksById = async (req, res) => {
  const id = req.params.id;
  try {
    const link = await Link.findById(id);
    res.status(200).json(link);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get links by user id

exports.getLinksByUserId = async (req, res) => {
  const id = req.params.id;

  try {
    const link = await Link.findOne({ userId: id });
    res.status(200).json(link);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update or add to specifc links by user id and link id

exports.updateLinksByUserId = async (req, res) => {
  const id = req.params.id;
  const { linksData } = req.body;

  // Check if user already has links saved
  const user = await Link.findOne({ userId: id });
  if (!user) {
    return res.status(401).json({ message: "لم تقم بحفظ روابطك" });
  }

  try {
    const link = await Link.findOneAndUpdate(
      { userId: id },
      { $set: { links: linksData } },
      { new: true }
    );
    res.status(200).json({ message: "تم تحديث الروابط بنجاح" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete links by user id and link id

exports.deleteLinkById = async (req, res) => {
  const linkId = req.params.id; // Assuming the link ID is stored in req.params.id

  try {
    // Delete the link with the given ID
    const result = await Link.deleteOne({ _id: linkId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "تم حذف الرابط بنجاح" });
    } else {
      res.status(404).json({ message: "لم يتم العثور على الرابط" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
