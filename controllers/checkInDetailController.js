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

    // Set status true and record time
    record.arrivalCheckInStatus = true;
    record.arrivalCheckInTime = new Date().toISOString();

    await record.save();

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

    res.status(200).json({
      message: "Presentation submitted successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
