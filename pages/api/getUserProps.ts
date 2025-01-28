
import { GenerateTable } from "../../utils/generateTable";
import { AppDataSource } from "../../app/lib/data-source";

import { ResponseInstance } from "../../utils/instances";
import { Users } from "../../app/entity/Users";




export default async function handler(req, res) {

  const UsersRepo = AppDataSource.getRepository(Users);

  if (req.method == "GET") {

    try {

      const BuisnesData = await UsersRepo.createQueryBuilder("business").getMany();

      const tablerows = BuisnesData.map(data =>{
      return  {
          id : data.id,
          name : data.name
        }
      })

      const tabledata = new GenerateTable({
        name: "Buisness",
        data: tablerows,
      });

      const response: ResponseInstance = {
        message: "Request successful",
        data: tabledata,
        status: 200,
      };

      res.json(response);
    } catch (e) {
      const response: ResponseInstance = {
        message: "Something Went Wrong",
        data: [],
        status: 500,
      };

      res.json(response);
    }
  }

  if (req.method == "DELETE") {
    try {
      await UsersRepo
        .createQueryBuilder("buisness")
        .delete()
        .where("id = :id", { id: req.query.id })
        .execute();

      const response: ResponseInstance = {
        message: "Record Deleted Succesfully",
        data: [],
        status: 200,
      };

      res.json(response);

    } catch (e) {
        
      const response: ResponseInstance = {
        message: "Something went wrong while deleting record",
        data: [e],
        status: 500,
      };

      res.json(response);
    }
  }
}
