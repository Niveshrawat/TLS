import vcForm from "../models/vcForm.js";
import Admin from "../models/adminModel.js";

export const submitVcForm = async (req, res) => {
  try {
    const { name, phoneNumber, emailId, location, courseName } = req.body;

    if (!name || !phoneNumber || !emailId || !location || !courseName) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const newVcForm = new vcForm({ 
      name, 
      phoneNumber, 
      emailId, 
      location, 
      courseName, 
      userId: req.user._id, // Assuming req.user._id is set by authentication middleware
    });
    await newVcForm.save();
    res.status(201).send('Vocational education data saved successfully');
  } catch (error) {
    res.status(400).send(`Error saving vocational education data: ${error.message}`);
  }
};

export const getAllVcForms = async (req, res) => {
  try {
    const forms = await vcForm.find({});
    res.json(forms);
  } catch (error) {
    res.status(500).send(`Error retrieving vocational education data: ${error.message}`);
  }
};

// Function to assign a lead to a caller (team leader functionality)
export const assignVcLeadToCaller = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { callerId } = req.body;

    const caller = await Admin.findById(callerId);
    if (!caller || caller.role !== "caller") {
      return res.status(400).send({ success: false, message: "Invalid caller ID" });
    }

    const lead = await vcForm.findByIdAndUpdate(
      leadId,
      { assignedTo: callerId },
      { new: true }
    );

    if (!lead) {
      return res.status(404).send({ success: false, message: "Lead not found" });
    }

    res.json(lead);
  } catch (error) {
    res.status(400).send(`Error assigning lead to caller: ${error.message}`);
  }
};

// Function to update the status of a lead (caller functionality)
export const updateVcLeadStatus = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { status } = req.body;
    const callerId = req.user._id;

    const lead = await vcForm.findById(leadId);

    if (!lead) {
      return res.status(404).send({ success: false, message: "Lead not found" });
    }

    if (lead.assignedTo.toString() !== callerId) {
      return res.status(403).send({ success: false, message: "Unauthorized: You are not assigned to this lead" });
    }

    lead.status = status;
    await lead.save();

    res.json(lead);
  } catch (error) {
    res.status(400).send(`Error updating lead status: ${error.message}`);
  }
};

// Controller method to get leads assigned to a specific caller
export const getVcLeadsForCaller = async (req, res) => {
  try {
    const callerId = req.user._id;

    const leads = await vcForm.find({ assignedTo: callerId });

    if (!leads.length) {
      return res.status(404).send({ success: false, message: 'No leads found for this caller' });
    }

    res.json(leads);
  } catch (error) {
    res.status(500).send(`Error retrieving leads: ${error.message}`);
  }
};

// Get all callers
export const getAllVcCallers = async (req, res) => {
  try {
    const callers = await Admin.find({ role: "caller" }, "name _id");
    res.status(200).json({
      success: true,
      message: "Callers retrieved successfully",
      callers,
    });
  } catch (error) {
    console.error("Error retrieving callers:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving callers",
      error,
    });
  }
};

// Controller method to get colleges a user has applied to
export const getUserAppliedVocationalCourses = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user._id is set by authentication middleware

    const courses = await vcForm.find({ userId }).select('courseName');
    
    res.status(200).send({
      success: true,
      message: 'Vocational courses retrieved successfully',
      courses,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error retrieving vocational courses',
      error: error.message,
    });
  }
};
