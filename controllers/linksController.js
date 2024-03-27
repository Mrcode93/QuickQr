const Link = require("../models/linksModel");

exports.createLink = async (req, res) => {
  const data = req.body;
  // Create an array of objects with 'key' and 'value' from the request body
  const links = Object.keys(data).map((key) => ({
    key: key,
    value: data[key],
  }));
  const link = new Link({ links });

  try {
    const newLink = await link.save();
    res.status(201).json(newLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
