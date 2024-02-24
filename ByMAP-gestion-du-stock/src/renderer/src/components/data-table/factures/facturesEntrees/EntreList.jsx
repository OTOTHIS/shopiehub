


import { Loader } from "lucide-react";

import { useEffect, useState } from "react";

import axios from 'axios'
import { NODE_URL } from "@/api/axios.js";
import { EntreColumns } from "./EntreColumns.jsx";
import { DataTable } from "../../DataTable.jsx";

export default function EntreList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const magazin = localStorage.getItem('magazin')
        const id = JSON.parse(magazin)
        const response = await axios.get(`${NODE_URL}/facture/entre/${id}`);
        console.log(response)
        setData(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div class="h-56 flex items-center   justify-center w-96 mx-auto">
          <Loader
            id="loadSubmit"
            className={"mx-2 my-2 text-2xl animate-spin"}
          />
        </div>
      ) : (
        <DataTable columns={EntreColumns} data={data} filterKey={"id"} />
      )}
    </>
  );
}
