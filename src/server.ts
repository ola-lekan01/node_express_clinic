import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signInUser } from "./handlers/user";

const app = express();

app.get("/", (res:any)=>{
res.json({message: "Nope from the Server"})
})

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/user", createNewUser);
app.post("/signin", signInUser);
app.use("/api", protect, router);

app.use((err: any, req: any, res: any, next: any) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized." });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid Input.." });
  } else {
    res.status(500).json({ message: "Opps thats on us... " });
  }
});

export default app;