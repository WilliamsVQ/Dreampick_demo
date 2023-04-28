import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../alternative_theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.primary[100]}
        fontWeight="bold"
        sx={{ m: "20 20 30px 20" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.text[100]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;