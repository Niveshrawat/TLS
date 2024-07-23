import LongTermCertificate from "../models/longTermCertificate.js";
import Admin from "../models/adminModel.js";
export const submitLongTermCertificateForm = async (req, res) => {
  try {
    const { name, phoneNumber, emailId, location, category } = req.body;
    if (!name || !phoneNumber || !emailId || !location || !category) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const newCertificate = new LongTermCertificate({ name, phoneNumber, emailId, location, category });
    await newCertificate.save();
    res.status(201).send('Long-term certificate data saved successfully');
  } catch (error) {
    res.status(400).send(`Error saving long-term certificate data: ${error.message}`);
  }
};

export const getLongTermCertificates = async (req, res) => {
  try {
    const certificates = await LongTermCertificate.find({});
    res.json(certificates);
  } catch (error) {
    res.status(500).send(`Error retrieving long-term certificate data: ${error.message}`);
  }
};

// Controller method to get leads assigned to a specific caller
export const getLeadsForCaller = async (req, res) => {
  try {
    const callerId = req.user._id;
    const leads = await LongTermCertificate.find({ assignedTo: callerId });
    if (!leads.length) {
      return res.status(404).send({ success: false, message: 'No leads found for this caller' });
    }
    res.json(leads);
  } catch (error) {
    res.status(500).send(`Error retrieving leads: ${error.message}`);
  }
};

// Controller method to assign a lead to a caller
export const assignLeadToCaller = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { callerId } = req.body;

    const caller = await Admin.findById(callerId);
    if (!caller || caller.role !== "caller") {
      return res.status(400).send({ success: false, message: "Invalid caller ID" });
    }

    const lead = await LongTermCertificate.findByIdAndUpdate(
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

// Controller method to update the status of a lead
export const updateLeadStatus = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { status } = req.body;
    const callerId = req.user._id;

    const lead = await LongTermCertificate.findById(leadId);

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
