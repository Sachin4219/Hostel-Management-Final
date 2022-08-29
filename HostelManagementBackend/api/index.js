import express from "express";
const router = express.Router();

import {
  registerStudent,
  loginStudent,
  check_authStudent,
} from "../controllers/student.js";

import {
  registerAdmin,
  loginAdmin,
  check_authAdmin,
} from "../controllers/admin.js";


import { getComplaints, getComplaintsAdmin, postComplaint, updateComplaintStatus} from "../controllers/complaint.js";
// import { verifyOTP , generateOTP} from "../controllers/forgotPass.js";

// Student Routes
router.post("/student/register", registerStudent);
router.post("/student/login", loginStudent);

// Complaint Routes
router.get("/student/complaints/:username", check_authStudent, getComplaints);
router.post("/student/complaints", check_authStudent, postComplaint);


// Check Auth
router.get("/student/check_login", check_authStudent, (req, res) => {
  return res.status(200).json({ verified: true });
});

// Check OTP
// router.post("/student/reset", verifyOTP)
// router.post("/student/forgotPassword", generateOTP)

// Admin Routes
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);

// Complaint Routes
router.get("/admin/complaints/:type", check_authAdmin, getComplaintsAdmin);
router.put("/admin/complaints/:type", updateComplaintStatus);

//check auth
router.get("/admin/check_login", check_authAdmin, (req, res) => {
  return res.status(200).json({ verified: true });
});
export default router;