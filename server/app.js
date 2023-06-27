import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import todoRouter from "./routes/todo.router.js";
import notificationRouter from "./routes/notification.router.js";

import {connect_db} from './db/mongoose.connection.js';
const { PORT = 8080,HOST = 'localhost',
    DB_URI = "mongodb+srv://ellabenatia:ellabenatia123456789@cluster0.lkywy3e.mongodb.net/paybox"} = process.env;
class Api {
    constructor() {
        this.app = express();
        this.applyGlobalMiddleware();
        this.routing();
         this.errorHanlers();
    }

    applyGlobalMiddleware() {
        console.log("setting Middlewares...");
        this.app.use(cors());
        // parse json req.body on post routes
        this.app.use(express.json());
        this.app.use(morgan("dev"));
    }

    routing() {
        this.app.use("/api/todo", todoRouter);
        this.app.use("/api/notification", notificationRouter);
    }

    //when no routes were matched...

    errorHanlers(){
        this.app.use("*",(req,res,next)=>{
            res.status(404).send(`404 error ${req.url} not found`);
        })
    }
    // start the express api server
    async startServer(){
        try {
            //start the express api server
            await connect_db(String(DB_URI));
            await this.app.listen(PORT,HOST);
           console.log(
                "api is live on",
                ` ✨ ⚡  http://${HOST}:${PORT} ✨ ⚡`
            );
        } catch (err) {
            console.log(err);
        }
    }
}

const api = new Api();

 await api.startServer();
