import schedule from "node-schedule"
import Complaint from "./models/complaint.js"

const updateTime = 86400000 
const days = 7

export const runEscalater = () => {
    const escalater = schedule.scheduleJob("0 0 * * *", () => {
        // call api
        Complaint.find({}, (err,allComplaints) => {
            allComplaints.forEach(complaint => {
                const curDate = new Date()
                if(Math.round((curDate - complaint.lastEscalate)/updateTime) > days){
                    const officer = complaint.handlingOfficer
                    complaint.lastEscalate = curDate
                    if(officer < 3)
                        complaint.handlingOfficer = officer + 1 
                    complaint.save()   
                }
            });
        })
    })

}