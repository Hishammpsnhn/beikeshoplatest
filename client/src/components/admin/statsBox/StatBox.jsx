import { Box, Typography, useTheme } from "@mui/material";

import ProgressCircle from "../progressCircle/ProgressCircle";
import person from '@mui/icons-material/Person2'
const StatBox = ({ title, amount, icon, progress, increase }) => {


  return (
    <Box width="100%" m="0 30px" >
      <Box display="flex" justifyContent="space-between">
        <Box>

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: 'white' }}
          >
            {title}
          </Typography>
        </Box>
        {/* <Box>
          <ProgressCircle  />
        </Box> */}
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h6" sx={{ color: 'white'}}>
          {amount}
        </Typography>
        {/* <Typography
          variant="body1"
          fontStyle="italic"
          sx={{ color: 'white' }}
        >
          +98 %
        </Typography> */}
      </Box>
    </Box>
  );
};

export default StatBox;