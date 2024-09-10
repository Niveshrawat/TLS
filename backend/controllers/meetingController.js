import Meeting from '../models/meetingModel.js';

// Create a new meeting
export const createMeetingController = async (req, res) => {
  try {
    const { title, description, meetingLink, date, time } = req.body;

    const meeting = new Meeting({
      title,
      description,
      meetingLink,
      date,
      time,
      createdBy: req.user._id,
    });

    await meeting.save();

    res.status(201).send({
      success: true,
      message: "Meeting created successfully",
      meeting,
    });
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).send({
      success: false,
      message: "Error creating meeting",
      error,
    });
  }
};

// Get all meetings
export const getAllMeetingsController = async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ date: -1 });

    res.status(200).send({
      success: true,
      message: "Meetings fetched successfully",
      meetings,
    });
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching meetings",
      error,
    });
  }
};

// Get a single meeting by ID
export const getMeetingByIdController = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).send({
        success: false,
        message: "Meeting not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Meeting fetched successfully",
      meeting,
    });
  } catch (error) {
    console.error("Error fetching meeting:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching meeting",
      error,
    });
  }
};

// Update a meeting by ID
export const updateMeetingController = async (req, res) => {
  try {
    const { title, description, meetingLink, date, time } = req.body;

    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { title, description, meetingLink, date, time },
      { new: true, runValidators: true }
    );

    if (!meeting) {
      return res.status(404).send({
        success: false,
        message: "Meeting not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Meeting updated successfully",
      meeting,
    });
  } catch (error) {
    console.error("Error updating meeting:", error);
    res.status(500).send({
      success: false,
      message: "Error updating meeting",
      error,
    });
  }
};

// Delete a meeting by ID
export const deleteMeetingController = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);

    if (!meeting) {
      return res.status(404).send({
        success: false,
        message: "Meeting not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Meeting deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting meeting:", error);
    res.status(500).send({
      success: false,
      message: "Error deleting meeting",
      error,
    });
  }
};

// Delete all meetings
export const deleteAllMeetingsController = async (req, res) => {
  try {
    await Meeting.deleteMany({});
    res.status(200).send({
      success: true,
      message: "All meetings deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting all meetings:", error);
    res.status(500).send({
      success: false,
      message: "Error deleting all meetings",
      error,
    });
  }
};
