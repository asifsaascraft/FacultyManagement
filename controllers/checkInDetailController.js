import CheckInDetail from "../models/CheckInDetail.js";
import sendEmailWithTemplate from "../utils/sendEmail.js";

// =======================
// Create Faculty Check-In Record
// =======================
export const createCheckInDetail = async (req, res) => {
  try {
    const { email } = req.body;

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

// =======================
// Get All Check-In Records Where arrivalDate exists
// =======================
export const getArrivalDateExists = async (req, res) => {
  try {
    const data = await CheckInDetail.find({
      arrivalDate: { $exists: true, $ne: "" }
    }).sort({ createdAt: -1 });

    res.status(200).json({ count: data.length, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Get All Check-In Records Where departureDate exists
// =======================
export const getDepartureDateExists = async (req, res) => {
  try {
    const data = await CheckInDetail.find({
      departureDate: { $exists: true, $ne: "" }
    }).sort({ createdAt: -1 });

    res.status(200).json({ count: data.length, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Get All Check-In Records Where hotelName exists
// =======================
export const getHotelNameExists = async (req, res) => {
  try {
    const data = await CheckInDetail.find({
      hotelName: { $exists: true, $ne: "" }
    }).sort({ createdAt: -1 });

    res.status(200).json({ count: data.length, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Get All Check-In Records Where topicName exists
// =======================
export const getTopicNameExists = async (req, res) => {
  try {
    const data = await CheckInDetail.find({
      topicName: { $exists: true, $ne: "" }
    }).sort({ createdAt: -1 });

    res.status(200).json({ count: data.length, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =======================
// Update Arrival Check-In
// =======================
export const updateArrivalCheckIn = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await CheckInDetail.findById(id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    record.arrivalCheckInStatus = true;
    record.arrivalCheckInTime = new Date().toISOString();
    await record.save();

    // Send email
    await sendEmailWithTemplate({
      to: record.email,
      name: record.facultyName,
      templateKey: "2518b.554b0da719bc314.k1.42ea3d10-c8f7-11f0-9753-62df313bf14d.19ab45b5361",
      mergeInfo: { facultyName: record.facultyName },
    });

    res.status(200).json({
      message: "Arrival check-in updated successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Update Departure Check-In
// =======================
export const updateDepartureCheckIn = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await CheckInDetail.findById(id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    record.departureCheckInStatus = true;
    record.departureCheckInTime = new Date().toISOString();
    await record.save();

    // Send email
    await sendEmailWithTemplate({
      to: record.email,
      name: record.facultyName,
      templateKey: "2518b.554b0da719bc314.k1.048b9820-c8f7-11f0-9753-62df313bf14d.19ab459baa2",
      mergeInfo: { facultyName: record.facultyName },
    });

    res.status(200).json({
      message: "Departure check-in updated successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Update Hotel Check-In
// =======================
export const updateHotelCheckIn = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await CheckInDetail.findById(id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    record.hotelCheckInStatus = true;
    record.hotelCheckInTime = new Date().toISOString();
    await record.save();

    // Send email
    await sendEmailWithTemplate({
      to: record.email,
      name: record.facultyName,
      templateKey: "2518b.554b0da719bc314.k1.9c92c5e0-c8f6-11f0-9753-62df313bf14d.19ab457113e",
      mergeInfo: { facultyName: record.facultyName },
    });

    res.status(200).json({
      message: "Hotel check-in updated successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Update Hall Check-In
// =======================
export const updateHallCheckIn = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await CheckInDetail.findById(id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    record.hallCheckInStatus = true;
    record.hallCheckInTime = new Date().toISOString();
    await record.save();

    // Send email
    await sendEmailWithTemplate({
      to: record.email,
      name: record.facultyName,
      templateKey: "2518b.554b0da719bc314.k1.8344aed0-c8f3-11f0-9753-62df313bf14d.19ab442c23d",
      mergeInfo: { facultyName: record.facultyName },
    });

    res.status(200).json({
      message: "Hall check-in updated successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Update Presentation Submit Status
// =======================
export const updatePresentationSubmit = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await CheckInDetail.findById(id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    record.presentationSubmitStatus = true;
    record.presentationSubmitTime = new Date().toISOString();
    await record.save();

    // Send email
    await sendEmailWithTemplate({
      to: record.email,
      name: record.facultyName,
      templateKey: "2518b.554b0da719bc314.k1.a1241fc0-c8f4-11f0-9753-62df313bf14d.19ab44a13bc",
      mergeInfo: { facultyName: record.facultyName },
    });

    res.status(200).json({
      message: "Presentation submitted successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
