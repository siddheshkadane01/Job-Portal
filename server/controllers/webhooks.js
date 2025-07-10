import { Webhook } from "svix";
import User from "../models/User";

// API controller function to manage clerk user with database
export const clerkWebhook = async (req, res) => {
    try {
        console.log("Webhook received - Headers:", JSON.stringify(req.headers));
        console.log("Webhook body:", JSON.stringify(req.body));
        
        //create a svix webhook instance
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        console.log("Webhook secret available:", !!process.env.CLERK_WEBHOOK_SECRET);

        //Verify the headers
        try {
            await webhook.verify(JSON.stringify(req.body), {
                "svix-id": req.headers["svix-id"],
                "svix-timestamp": req.headers["svix-timestamp"],
                "svix-signature": req.headers["svix-signature"]
            });
            console.log("Webhook verification successful");
        } catch (verifyError) {
            console.error("Webhook verification failed:", verifyError);
            return res.status(400).json({ success: false, message: "Webhook verification failed" });
        }

        //Getting data from req body 
        const { data, type } = req.body;
        console.log("Processing event type:", type);

        //switch case to handle different webhook events
        switch(type) {
            case "user.created":
                //create a new user in the database
                const userData = {
                    _id: data.id,
                    email: data.emailAddresses[0].emailAddress,
                    name: data.firstName + " " + data.lastName,
                    image: data.image_url,
                    resume: ''
                }
                await User.create(userData);
                break;

            case "user.updated":
                //update the user in the database
                const updatedUserData = {
                    email: data.emailAddresses[0].emailAddress,
                    name: data.firstName + " " + data.lastName,
                    image: data.image_url
                }
                await User.findByIdAndUpdate(data.id, updatedUserData);
                break;

            case "user.deleted":
                //delete the user from the database
                await User.findByIdAndDelete(data.id);
                break;

            default:
                console.log("Unhandled event type:", type);
        }

        // Send response only once after switch case completes
        return res.status(200).json({ success: true });
    } 
    catch (error) {
        console.error("Webhook error details:", error);
        console.error("Error stack:", error.stack);
        return res.status(400).json({ 
            success: false, 
            message: "Webhook error: " + error.message
        });
    }
}