import CheckInDetail from "../models/CheckInDetail.js";

// =======================
// Create Faculty Check-In Record
// =======================
export const createCheckInDetail = async (req, res) => {
  try {
    const { email } = req.body;

    
    const exists = await CheckInDetail.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const data = await CheckInDetail.create(req.body);

    res.status(201).json({
      message: "Check-in record created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Get All Check-In Records
// =======================
export const getAllCheckInDetails = async (req, res) => {
  try {
    const data = await CheckInDetail.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Get Single Check-In Record
// =======================
export const getCheckInDetailById = async (req, res) => {
  try {
    const data = await CheckInDetail.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
