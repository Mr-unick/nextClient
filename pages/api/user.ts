// src/pages/api/users.ts
import { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource } from "../../app/lib/data-source";


export default async function handler(req , res) {

  if (req.method === "DELETE") {
    try {
      
      res.status(200).json({'msg':"Done"});
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  }
}
