import React, { useEffect,  useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from "axios"
import { NODE_URL } from '@/api/axios';


const CustomizedLabel = ({ x, y, stroke, value }) => {
  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
};

const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
        {payload.value}
      </text>
    </g>
  );
};

const Overview = () => {
const [data,setData]=useState([])
useEffect(() => {
  const magazin = parseInt(localStorage.getItem('magazin'))
 async function fetchData() {
 const response = await axios.get(`${NODE_URL}/products/charts/${magazin}`)

 setData(response.data)
  }

  fetchData();
}, [])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" height={60} tick={<CustomizedAxisTick />} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sum_plus" stroke="#8884d8" label={<CustomizedLabel />} />
        <Line type="monotone" aria-placeholder='Facture de sortie' dataKey="sum_minus" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Overview;
