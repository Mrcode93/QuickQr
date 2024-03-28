const Link = require("../models/linksModel");

exports.createLink = async(req, res) => {
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
        res.status(201).json({ message: "! تم حفظ روابطك بنجاح " });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "حدث خطأ في حفظ روابطك ، حاول مرة اخرى" });
    }
};

exports.getLinksById = async(req, res) => {
    const id = req.params.id;
    try {
        const link = await Link.findById(id);
        res.status(200).json(link);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// get links by user id

exports.getLinksByUserId = async(req, res) => {
    const id = req.params.id;

    try {
        const link = await Link.findOne({ userId: id });
        res.status(200).json(link);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};