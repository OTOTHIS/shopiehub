

import { DataTable } from "../DataTable.jsx";
import { AdminOwnerColumns } from "./AdminOwnerColumns.jsx";
import { Loader } from "lucide-react";

import { useEffect, useState } from "react";
import OwnerApi from "../../../services/Api/OwnerApi.js";
import { ProductMagazinOwnerColumns } from "./ProdcutOwnerColumns.jsx.jsx";

export default function ProductMagazinOwnerList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await OwnerApi.all();
        alert(response.data)
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
          
       data.map(v=> {
        <li>v</li>
       })

        // <DataTable columns={ProductMagazinOwnerColumns} data={data} />
      )}
    </>
  );
}
