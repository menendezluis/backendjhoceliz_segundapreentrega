import messageModel from "../dao/mongoManager/models/message.model.js";
import { Router } from "express";

const chatRouter = Router();

chatRouter.get("/chat",(req,res)=>{
    res.render("chat",{title:"Chat", script: "chat.js"})
})

export default chatRouter;