import { useEffect, useState } from "react";
import MagazinApi from "../../services/Api/magazinApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function OwnerMagazinDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    MagazinApi.all()
      .then(({data}) => {
        setData(data);
        console.log(data);
      })
      .catch((reason) => {
        console.warn(reason);
      });
  }, []);

  return (
    <Table>
      <TableCaption>A list of your recent magazin.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">id</TableHead>
          <TableHead>name</TableHead>
          <TableHead>adresse</TableHead>
          <TableHead className="text-right">action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((magazin) => (
          <TableRow key={magazin.id}>
            <TableCell className="font-medium">{magazin.id}</TableCell>
            <TableCell>{magazin.name}</TableCell>
            <TableCell>{magazin.adresse}</TableCell>
            <TableCell className="text-right">
              {
                <a
                  href={`https://www.google.com/maps/@${magazin.Latitude},${magazin.Longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  show
                </a>
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow></TableRow>
      </TableFooter>
    </Table>

 
    );
}
