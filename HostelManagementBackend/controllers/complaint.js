import Complaint from "../models/complaint.js";
import { check_authStudent } from "./student.js";
import Client from "../models/client.model.js";

export const getComplaints = (req, res) => {
  try {
    const username = req.params.username
    console.log("[Request]",username)
    Complaint.find({name:username}, (err, allComplaints) => {
      if (err) throw err;
      else {
        console.log(allComplaints)
        res.status(200).json({ complaints: allComplaints });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};


export const getComplaintsAdmin = (req, res) => {
  try {
    const officerType = parseInt(req.params.type.at(-1))
    Complaint.find({handlingOfficer: officerType}, (err, allComplaints) => {
      if(!err)
        res.status(200).json({complaints: allComplaints})
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};

//Studennt Complaint Post
export const postComplaint = (req, res) => {
    console.log("this is complaint post route")
  try {
    const complaint = {
      name: req.body.name,
      hostelName: req.body.hostelName,
      issueCategory: req.body.issueCategory,
      availiability: req.body.availiability,
      phoneNumber: req.body.phoneNumber,
      roomNumber: req.body.roomNumber,
      description: req.body.description,
      status:"pending",
      handlingOfficer: 1,
      date:new Date(),
      lastEscalate: new Date()
    };

    Client.findOne({username: complaint.name}, async (err,student) => {
      if(!err){
        const newComplaint = new Complaint(complaint);
        await newComplaint.save();
        student.complaints.push(newComplaint.id)
        
        await student.save();
        console.log(student)
        
        res.status(201).json({ complaint: newComplaint });
        console.log(complaint)
      }   
    })
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};


export const updateComplaintStatus = async (req, res) => {
    console.log("this is complaint update route")
  try {
    const officerType = parseInt(req.params.type.at(-1))
    const status=req.body.status;

    const oldComplaint = await Complaint.findById(req.body._id)
    console.log(oldComplaint)
    if(Boolean(req.body.escalated)){
      if(officerType < 3){
        oldComplaint.lastEscalate = new Date();
        oldComplaint.handlingOfficer = parseInt(oldComplaint.handlingOfficer)+1 ; 
      }
    }
    else
      oldComplaint.status = status;
    
    console.log("[old]",oldComplaint);
    await oldComplaint.save();
    res.status(201).json({ complaint: oldComplaint });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};