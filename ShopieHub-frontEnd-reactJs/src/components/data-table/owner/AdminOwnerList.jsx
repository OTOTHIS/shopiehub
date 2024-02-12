// import {DataTable} from "../DataTable.jsx";
// import {AdminOwnerColumns} from "./AdminOwnerColumns.jsx";
// import {useEffect, useState} from "react";
// import OwnerApi from "../../../services/Api/OwnerApi.js";

// export default function AdminOwnerList() {
//   const [data, setData] = useState([])
//   useEffect(() => {
//     try {
//   OwnerApi.all().then(({data}) => {

//         setData(data)
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   }, []);
//   return <>
//     <DataTable columns={AdminOwnerColumns} data={data}/>
//   </>
// }

import { DataTable } from "../DataTable.jsx";
import { AdminOwnerColumns } from "./AdminOwnerColumns.jsx";
import { Loader } from "lucide-react";

import { useEffect, useState } from "react";
import OwnerApi from "../../../services/Api/OwnerApi.js";

export default function AdminOwnerList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await OwnerApi.all();
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
        <DataTable columns={AdminOwnerColumns} data={data} />
      )}
    </>
  );
}
