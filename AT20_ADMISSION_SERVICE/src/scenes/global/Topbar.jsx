/*
@node_command.js Copyright (c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20, Edificio Union No 1376, La Paz, Bolivia All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information "). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into with Jalasoft
*/

import { Box, IconButton, useTheme, Menu, MenuItem   } from '@mui/material';
import { useContext, useState } from 'react';
import { ColorModeContext } from '../../alternative_theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import './styles.css';

const Topbar = ({ handleLogout }) => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  
    const handleMenuOpen = (event) => {
      setMenuAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setMenuAnchorEl(null);
    };
  
    const handleLogoutClick = () => {
      handleLogout();
      handleMenuClose();
    };
  
    return (
      <Box display="flex" justifyContent="right" p={3}>
        <Box display="flex" textAlign="right">
          <IconButton className="topbar-icon-button" onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton onClick={handleMenuOpen}>
            <PersonOutlinedIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogoutClick}>
              <ExitToAppOutlinedIcon />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    );
  };
  
  export default Topbar;