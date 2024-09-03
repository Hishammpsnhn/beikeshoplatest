import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { getTopProduct } from "../../actions/dashboard";

function PieGraph() {
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    const getTop = async () => {
      const data = await getTopProduct();
      console.log(data);
      if (data) {
        const mappedData = data.map((item) => ({
          id: item.name,
          label: item.name,
          value: item.count,
          color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
        }));
        setMappedData(mappedData);
      }
    };
    getTop();
  }, []);
  console.log("maped",mappedData)
  if(mappedData.length <= 0){
    return <div>Loading...</div>
  }
  return (
    <ResponsivePie
      data={mappedData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "Men Printed Regular Fit Shirt with Spread Collar",
          },
          id: "dots",
        },
        {
          match: {
            id: "Men Zip-Front Regular Fit Jacket",
          },
          id: "dots",
        },
        {
          match: {
            id: "Floral Print Slim Fit Shirt",
          },
          id: "dots",
        },
        {
          match: {
            id: "Men Regallo Mid-Wash Skinny",
          },
          id: "dots",
        },
        {
          match: {
            id: "Men Fitted Track Pant",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "column",
          justify: false,
          translateX: 150,
          translateY: 70,
          itemsSpacing: 5,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
}

export default PieGraph;
