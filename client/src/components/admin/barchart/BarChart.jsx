import { Box, CircularProgress, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { tokens } from "../../../theme";

import { useEffect, useState } from "react";
import { dashboardLineGraph } from "../../../actions/dashboard";
const LineChart = ({ isDashboard, sort }) => {
  const [data, setData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dashboardLineGraph(sort);
      if (result) {
        setData(result);
      }
    };
    fetchData();
  }, [sort]);

  if (data.length === 0) {
    return (
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }
  console.log(data);
  return (
    <Box height={`${isDashboard ? "100%" : "90%"}`} overflow="hidden">
      {data[0].data.length <= 0  || !data ? (
        <Box sx={{marginTop:'50px'}}>No data available for this period.</Box>
      ) : (
        <ResponsiveLine
          data={data.length > 0 && data}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
            tooltip: {
              container: {
                background: colors.grey[900],
                color: colors.grey[100],
              },
            },
          }}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "country",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "food",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          colors={{ scheme: "nivo" }}
          lineWidth={2}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 12,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          ariaLabel={function (e) {
            return `${e.serie.id}: ${e.point.data.yFormatted} in ${e.point.data.x}`;
          }}
        />
      )}
    </Box>
  );
};

export default LineChart;
