import { Box } from "@mui/material";

const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(#e0f7fa 55%, transparent 56%), 
            conic-gradient(transparent 0deg ${angle}deg, grey ${angle}deg 360deg), 
            #D4499F`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;

