import { useEffect, useState } from "react";
import MagazinApi from "../../../services/Api/magazinApi";

import {  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, } from "../../ui/card";
import { Separator } from "../../ui/separator";

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

<>

     {(data?.length !==0 ? data.map((magazin) => ( <section className="text-gray-600 body-font">

     <div className="container px-5 py-24 mx-auto flex flex-col">
    <div className="lg:w-4/6 mx-auto">
      <div className="rounded-lg h-64 overflow-hidden">
        <img alt="content" className="object-fill aspect-square object-center h-full w-full" src={magazin.image_url} />
      </div>
      <div className="flex flex-col sm:flex-row mt-10">
        <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
          <p className="leading-relaxed text-lg mb-4">Meggings portland fingerstache lyft, post-ironic fixie man bun banh mi umami everyday carry hexagon locavore direct trade art party. Locavore small batch listicle gastropub farm-to-table lumbersexual salvia messenger bag. Coloring book flannel truffaut craft beer drinking vinegar sartorial, disrupt fashion axe normcore meh butcher. Portland 90's scenester vexillologist forage post-ironic asymmetrical, chartreuse disrupt butcher paleo intelligentsia pabst before they sold out four loko. 3 wolf moon brooklyn.</p>
          <a className="text-indigo-500 inline-flex items-center">Learn More
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
  <Separator className="my-1" />
      </section>
      
    )):"loading ....")}
 </>
    );
}
