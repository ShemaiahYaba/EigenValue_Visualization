import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import Tooltip from "@/components/UiComponents/Tooltip";
import { Lightbulb } from "lucide-react";

interface InsightProps {
  insights: {
    title: string;
    description: string;
    value?: number | string;
    titleTooltip?: string;
  }[];
}

const Insights: React.FC<InsightProps> = ({ insights = [] }) => {
  return (
    <Box sx={{ padding: "1.5rem" }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 400,
          color: "text.primary",
        }}
      >
        Visualization Insights
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {insights.map((insight, index) =>
          <Card
            key={index}
            elevation={0}
            sx={{
              height: "100%",
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 1,
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <div className="relative">
                {insight.titleTooltip && (
                  <div className="absolute top-0 right-0 z-10">
                    <Tooltip content={insight.titleTooltip}>
                      <span tabIndex={0} className="cursor-pointer text-yellow-500 align-middle">
                        <Lightbulb size={18} />
                      </span>
                    </Tooltip>
                  </div>
                )}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 500,
                    color: "primary.main",
                    mb: 1,
                  }}
                >
                  {insight.title}
                </Typography>
              </div>
              {insight.value && (
                <Typography
                  variant="h5"
                  sx={{
                    my: 2,
                    fontWeight: 400,
                    color: "text.primary",
                  }}
                >
                  {insight.value}
                </Typography>
              )}
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.6,
                }}
              >
                {insight.description}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default Insights;
