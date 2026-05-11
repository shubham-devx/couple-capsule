const Capsule = require("../models/Capsule");
const { nanoid } = require("nanoid");

exports.createCapsule = async (req, res) => {
  try {
    const roomId = nanoid(8);

    const capsule = await Capsule.create({
  roomId,

  personOne: req.body.personOne,

  personTwo: req.body.personTwo,

  memories: [],
});

    res.json(capsule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCapsule = async (req, res) => {
  try {
    const capsule = await Capsule.findOne({
      roomId: req.params.roomId,
    });

    res.json(capsule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addMemory = async (req, res) => {
  try {
    const capsule = await Capsule.findOne({
      roomId: req.params.roomId,
    });

    capsule.memories.push(req.body);

    await capsule.save();

    res.json(capsule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateAnniversaryDate =
  async (req, res) => {

    try {

      const { roomId } = req.params;

      const { anniversaryDate } =
        req.body;

      const capsule =
        await Capsule.findOneAndUpdate(
          { roomId },
          { anniversaryDate },
          { new: true }
        );

      res.json(capsule);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
};