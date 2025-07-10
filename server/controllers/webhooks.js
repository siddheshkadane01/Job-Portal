import { Webhook } from "svix";
import User from "../models/User";
import e from "express";

// API controller function to manage clerk user with database
export const clerkWebhook = async (req, res) => {
    try{
        //create a svix webhook instance
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        //Verify the headers
        await webhook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        //Getting data from req body 
        const { data, type } = req.body;

        //switch case to handle different webhook events
        switch(type){
            case "user.created":
                //create a new user in the database
                const userData = {
                    _id: data.id,
                    email: data.emailAddresses[0].emailAddress,
                    name: data.firstName + " " + data.lastName,
                    image: data.image_url,  // Added comma here
                    resume:''
                }
                await User.create(userData);
                res.json({})
                break;

            case "user.updated":
                //update the user in the database
                const updatedUserData = {  // Changed variable name to avoid redeclaration
                    email: data.emailAddresses[0].emailAddress,
                    name: data.firstName + " " + data.lastName,
                    image: data.image_url
                }
                await User.findByIdAndUpdate(data.id, updatedUserData);
                res.json({})
                break;

            case "user.deleted":
                //delete the user from the database
                await User.findByIdAndDelete(data.id);
                res.json({})
                break;

            default:
                console.log("Unhandled event type:", type);
        }

    }


    catch (error){
        console.log(error.message);
        res.json({success: false, message: "Webhooks error"});
    }
}