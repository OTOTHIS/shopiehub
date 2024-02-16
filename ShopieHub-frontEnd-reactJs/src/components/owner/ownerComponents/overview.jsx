// "use client"

// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// const data = [
//   {
//     name: "Jan",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Feb",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Mar",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Apr",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "May",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Jun",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Jul",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Aug",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Sep",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Oct",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Nov",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Dec",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
// ]

// export function Overview() {
//   return (
//     <ResponsiveContainer width="100%" height={350}>
//       <BarChart data={data}>
//         <XAxis
//           dataKey="name"
//           stroke="#888888"
//           fontSize={12}
//           tickLine={false}
//           axisLine={false}
//         />
//         <YAxis
//           stroke="#888888"
//           fontSize={12}
//           tickLine={false}
//           axisLine={false}
//           tickFormatter={(value) => `$${value}`}
//         />
//         <Bar
//           dataKey="total"
//           fill="currentColor"
//           radius={[4, 4, 0, 0]}
//           className="fill-primary"
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   )
// }
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    category: 'Clothing',
    productA: 95,
    productB: 80,
    productC: 30,
  },
  {
    category: 'Dress',
    productA: 10,
    productB: 80,
    productC: 40,
  },
  {
    category: 'Bag',
    productA: 10,
    productB: 80,
    productC: 100,
  },
  // Add more data as needed
];

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     const data = payload.map(entry => ({ dataKey: entry.dataKey, value: entry.value }));
//     const maxProduct = data.reduce((max, entry) => (entry.value > max.value ? entry : max), { value: -Infinity });

//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${maxProduct.dataKey} - ${label} : ${maxProduct.value}`}</p>
//         {/* Add more details or description if needed */}
//       </div>
//     );
//   }

//   return null;
// };

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload.map(entry => ({ dataKey: entry.dataKey, value: entry.value }));
    const maxProduct = data.reduce((max, entry) => (entry.value > max.value ? entry : max), { value: -Infinity });

    // Replace this mapping with your actual product name logic
    const productNameMapping = {
      productA: "Product A",
      productB: "Product B",
      productC: "Product C",
      // Add more mappings as needed
    };

    const realProductName = productNameMapping[maxProduct.dataKey] || maxProduct.dataKey;

    return (
      <div className="custom-tooltip">
        <p className="label">{`${realProductName} - ${label} : ${maxProduct.value}`}</p>
        {/* Add more details or description if needed */}
      </div>
    );
  }

  return null;
};
export default class Overview extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="productA" barSize={20} fill="#8884d8" />
          <Bar dataKey="productB" barSize={20} fill="#82ca9d" />
          <Bar dataKey="productC" barSize={20} fill="#ffc658" />
         
          {/* Add more bars for additional products */}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
