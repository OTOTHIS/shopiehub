import { useEffect, useState } from "react";
import MagazinApi from "../../services/Api/magazinApi";

import {  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, } from "../ui/card";

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

  <div className="flex flex-col justify-items-center mx-auto  md:flex-row   ">
    {data.map((magazin) => (  <Card className="mt-5">
      <CardHeader>

        
        <CardTitle>{magazin.name}</CardTitle>
        <CardDescription>{magazin.adresse}</CardDescription>
      </CardHeader>
      <CardContent>
      <img class="h-40 rounded w-full object-cover object-center mb-6" src={magazin.image} alt="content" />
          <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">SUBTITLE</h3>
          <h2 class="text-lg text-gray-900 font-medium title-font éàmb-4">Great Pyramid of Giza</h2>
          <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
     
      </CardContent>
      <CardFooter className="flex justify-between">
     ewrewrwerwerwe
      </CardFooter>
    </Card>
    ))}
  </div>
  
    );
}
