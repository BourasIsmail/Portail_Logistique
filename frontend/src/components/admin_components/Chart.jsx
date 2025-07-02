import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Sector,
  Tooltip,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#4BF0E8"];
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    let n = item.value;
    if (item.value.toString().includes(".")) {
      n = item.value.toFixed(2) + " %";
    }

    return (
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          fontSize: "14px",
        }}
      >
        <p className="font-bold text-gray-800">{item.payload.name}</p>
        <p className="text-gray-600">Value: {n}</p>
      </div>
    );
  }

  return null;
};

export default function Chart({ data, title, description }) {
  return (
    <Card className="flex flex-col gap-0 justify-between relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-gray-50 to-gray-100">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center text-lg font-semibold">
          {title}
        </CardTitle>
        <CardDescription className="text-center text-sm text-gray-500">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-48 w-full ">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={CustomTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-800" />
    </Card>
  );
}
