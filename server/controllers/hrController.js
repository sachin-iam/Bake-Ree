import Employee from "../models/Employee.js";
import Role from "../models/Role.js";
import Attendance from "../models/Attendance.js";
import Shift from "../models/Shift.js";
import LeaveRequest from "../models/LeaveRequest.js";
import PayrollRun from "../models/PayrollRun.js";
import Payslip from "../models/Payslip.js";
import PerformanceReview from "../models/PerformanceReview.js";
import Approval from "../models/Approval.js";
import Document from "../models/Document.js";

const listEntities = (Model) => async (_req, res) => {
  try {
    const items = await Model.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    console.error("❌ HR list error:", err);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

const getEntity = (Model) => async (req, res) => {
  try {
    const item = await Model.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Record not found" });
    res.status(200).json(item);
  } catch (err) {
    console.error("❌ HR get error:", err);
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

const createEntity = (Model) => async (req, res) => {
  try {
    const item = await Model.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    console.error("❌ HR create error:", err);
    res.status(500).json({ error: "Failed to create record" });
  }
};

const updateEntity = (Model) => async (req, res) => {
  try {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ error: "Record not found" });
    res.status(200).json(item);
  } catch (err) {
    console.error("❌ HR update error:", err);
    res.status(500).json({ error: "Failed to update record" });
  }
};

export const listEmployees = listEntities(Employee);
export const getEmployee = getEntity(Employee);
export const createEmployee = createEntity(Employee);
export const updateEmployee = updateEntity(Employee);

export const listRoles = listEntities(Role);
export const getRole = getEntity(Role);
export const createRole = createEntity(Role);
export const updateRole = updateEntity(Role);

export const listAttendance = listEntities(Attendance);
export const getAttendance = getEntity(Attendance);
export const createAttendance = createEntity(Attendance);
export const updateAttendance = updateEntity(Attendance);

export const listShifts = listEntities(Shift);
export const getShift = getEntity(Shift);
export const createShift = createEntity(Shift);
export const updateShift = updateEntity(Shift);

export const listLeaveRequests = listEntities(LeaveRequest);
export const getLeaveRequest = getEntity(LeaveRequest);
export const createLeaveRequest = createEntity(LeaveRequest);
export const updateLeaveRequest = updateEntity(LeaveRequest);

export const approveLeaveRequest = async (req, res) => {
  try {
    const leave = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status: "APPROVED", approver: req.user?._id ?? undefined },
      { new: true }
    );
    if (!leave) return res.status(404).json({ error: "Leave request not found" });
    res.status(200).json(leave);
  } catch (err) {
    console.error("❌ HR approve leave error:", err);
    res.status(500).json({ error: "Failed to approve leave" });
  }
};

export const rejectLeaveRequest = async (req, res) => {
  try {
    const leave = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status: "REJECTED", approver: req.user?._id ?? undefined },
      { new: true }
    );
    if (!leave) return res.status(404).json({ error: "Leave request not found" });
    res.status(200).json(leave);
  } catch (err) {
    console.error("❌ HR reject leave error:", err);
    res.status(500).json({ error: "Failed to reject leave" });
  }
};

export const listPayrollRuns = listEntities(PayrollRun);
export const getPayrollRun = getEntity(PayrollRun);
export const createPayrollRun = createEntity(PayrollRun);
export const updatePayrollRun = updateEntity(PayrollRun);

export const approvePayrollRun = async (req, res) => {
  try {
    const payroll = await PayrollRun.findByIdAndUpdate(
      req.params.id,
      { status: "APPROVED", approvedBy: req.user?._id ?? undefined, approvedAt: new Date() },
      { new: true }
    );
    if (!payroll) return res.status(404).json({ error: "Payroll run not found" });
    res.status(200).json(payroll);
  } catch (err) {
    console.error("❌ HR approve payroll error:", err);
    res.status(500).json({ error: "Failed to approve payroll" });
  }
};

export const lockPayrollRun = async (req, res) => {
  try {
    const payroll = await PayrollRun.findByIdAndUpdate(
      req.params.id,
      { status: "LOCKED" },
      { new: true }
    );
    if (!payroll) return res.status(404).json({ error: "Payroll run not found" });
    res.status(200).json(payroll);
  } catch (err) {
    console.error("❌ HR lock payroll error:", err);
    res.status(500).json({ error: "Failed to lock payroll" });
  }
};

export const listPayslips = listEntities(Payslip);
export const getPayslip = getEntity(Payslip);
export const createPayslip = createEntity(Payslip);
export const updatePayslip = updateEntity(Payslip);

export const listPerformanceReviews = listEntities(PerformanceReview);
export const getPerformanceReview = getEntity(PerformanceReview);
export const createPerformanceReview = createEntity(PerformanceReview);
export const updatePerformanceReview = updateEntity(PerformanceReview);

export const listApprovals = listEntities(Approval);
export const getApproval = getEntity(Approval);
export const createApproval = createEntity(Approval);
export const updateApproval = updateEntity(Approval);

export const listDocuments = listEntities(Document);
export const getDocument = getEntity(Document);
export const createDocument = createEntity(Document);
export const updateDocument = updateEntity(Document);
