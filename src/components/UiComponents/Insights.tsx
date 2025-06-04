import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

interface InsightProps {
  insights: {
    title: string;
    description: string;
    value?: number | string;
  }[];
}

const Insights: React.FC<InsightProps> = ({ insights = [] }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Visualization Insights
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {insights.map((insight, index) => (
          <Card key={index} sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" color="primary">
                {insight.title}
              </Typography>
              {insight.value && (
                <Typography variant="h4" sx={{ my: 2 }}>
                  {insight.value}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                {insight.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Insights;
