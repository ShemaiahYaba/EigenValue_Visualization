import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Line, Legend, Label, Cell
} from "recharts";

type PCAVarianceChartProps = {
  explainedVariance: number[];    // e.g., [0.4, 0.3, 0.2, 0.1]
  selectedPCs?: number[];         // e.g., [0, 1] to highlight PC1 and PC2
};

const PCAVarianceChart: React.FC<PCAVarianceChartProps> = ({ explainedVariance, selectedPCs = [] }) => {
  let cumulative = 0;
  const data = explainedVariance.map((variance, index) => {
    cumulative += variance;
    return {
      name: `PC${index + 1}`,
      index,
      variance: +(variance * 100).toFixed(2),       // % format
      cumulative: +(cumulative * 100).toFixed(2),   // % format
    };
  });

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h3 className="text-lg font-semibold text-center mb-2">Explained Variance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]}>
            <Label
              angle={-90}
              value="Variance (%)"
              position="insideLeft"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          
          <Bar dataKey="variance" name="Explained Variance">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={selectedPCs.includes(entry.index) ? "#f59e0b" : "#3b82f6"} // Amber for selected, blue for others
              />
            ))}
          </Bar>

          <Line
            type="monotone"
            dataKey="cumulative"
            stroke="#10b981"
            strokeWidth={2}
            name="Cumulative Variance"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PCAVarianceChart;
