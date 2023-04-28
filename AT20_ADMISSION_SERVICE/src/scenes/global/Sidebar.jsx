/*
@node_command.js Copyright (c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20, Edificio Union No 1376, La Paz, Bolivia All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information "). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into with Jalasoft
*/
import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import { tokens } from '../../alternative_theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import BugReportIcon from '@mui/icons-material/BugReport';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import GroupsIcon from '@mui/icons-material/Groups';
import './styles.css';
// eslint-disable-next-line react/prop-types
const Item = ({ title, to, icon, selected, setSelected }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <MenuItem
            active={selected === title}
            style={{
                color: colors.secondary[100]
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

// This function verifies the rol and filter the items to show on the sidebar menu
const filterItemsbyRole = (role) => {
    let filteredItem = [];
    if (role === 'Admin') {
        filteredItem = ['Dashboard', 'Add User', 'NewMeetings', 'Interviews', 'Tests', 'Create Questionaries', 'Workshops'];
    } else if (role === 'Trainer') {
        filteredItem = ['Dashboard', 'NewMeetings', 'Interviews', 'Create Questionaries', 'Workshops'];
    } else if (role === 'Candidate') {
        filteredItem = ['Meetings', 'Interviews', 'Tests', 'Workshops'];
    }
    return filteredItem;
};

// eslint-disable-next-line react/prop-types
const Sidebar = (props) => {

    const { loginData } = props;
    const role = loginData.info.role.name

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');
    const filteredItem = filterItemsbyRole(role);

    return (
        <Box
            sx={{
                '& .pro-sidebar-inner': {
                    background: `${colors.body[200]} !important`,

                },
                '& .pro-icon-wrapper': {
                    backgroundColor: 'transparent !important',

                },
                '& .pro-inner-item': {
                    padding: '5px 35px 5px 20px !important'
                },
                '& .pro-inner-item:hover': {
                    color: `${colors.primary[100]} !important`
                },
                '& .pro-menu-item.active': {
                    color: `${colors.primary[100]} !important`
                }
            }}
        >
            <ProSidebar
                sx={{ position: 'fixed' }}
                collapsed={isCollapsed}
            >
                <Menu iconShape='square'>
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: '10px 0 20px 0',
                            color: colors.primary[100]
                        }}
                    >
                        {!isCollapsed && (
                            <Box className="menu-item" >
                                <Typography variant='h3' color={colors.primary[100]}>
                                    JALASOFT
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb='25px'>
                            <Box className="profile-user-sector" >
                                <img
                                    alt='profile-user'
                                    src={loginData.info.photo}
                                    className="profile-user"
                                />
                            </Box>
                            <Box textAlign='center'>
                                <Typography
                                    variant='h2'
                                    color={colors.title[100]}
                                    sx={{ m: '10px 0 0 0' }}
                                >
                                    {loginData.info.firstName}
                                </Typography>
                                <Typography variant='h5' color={colors.lightText[100]}>
                                    {loginData.info.lastName}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                        {filteredItem.includes('Dashboard') && (
                            <Item
                                title='Dashboard'
                                to='/'
                                icon={<HomeOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}

                        {filteredItem.includes('Profile form') && (
                            <Item
                                title='Profile Form'
                                to='/form'
                                icon={<PersonOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}

                        <Item
                            title='Edit Profile'
                            to='/edit'
                            icon={<PersonOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {filteredItem.includes('Add User') && (
                            <Item
                                title='Add User'
                                to='/form'
                                icon={<PersonAddIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}
                        {filteredItem.includes('Meetings') && (
                            <>
                                <Typography
                                    variant='h5'
                                    color={colors.title[100]}
                                    className='menu-tittle'
                                >
                                    {!isCollapsed ? 'Meeting' : <Divider className='divider' />}
                                </Typography>

                                <Item
                                    title='My meetings'
                                    to='/meeting'
                                    icon={<GroupsIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />

                            </>
                        )}
                        {filteredItem.includes('NewMeetings') && (
                            <>
                                <Typography
                                    variant='h5'
                                    color={colors.title[100]}
                                    className='menu-tittle'
                                >
                                    {!isCollapsed ? 'Meeting' : <Divider className='divider' />}
                                </Typography>

                                <Item
                                    title='My meetings'
                                    to='/meeting'
                                    icon={<GroupsIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title='New meeting'
                                    to='/meeting/new'
                                    icon={<VideoCallIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        )}
                        {filteredItem.includes('Create Questionaries') && (
                            <>
                                <Typography
                                    variant='h5'
                                    color={colors.title[100]}
                                    className='menu-tittle'
                                >
                                    {!isCollapsed ? 'Create Questionnaire' : <Divider className='divider'  />}
                                </Typography>
                                <Item
                                    title='New Questionnaire'
                                    to='/questionnaire_form'
                                    icon={<FormatListBulletedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        )}
                        {filteredItem.includes('Tests') && (
                            <>
                                <Typography
                                    variant='h5'
                                    color={colors.title[100]}
                                    className='menu-tittle'
                                >
                                    {!isCollapsed ? 'Test' : <Divider className='divider' />}
                                </Typography>
                                <Item
                                    title='Aptitude Tests'
                                    to='/aptitude'
                                    icon={<ReceiptOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title='Reasoning Test'
                                    to='/reasoning'
                                    icon={<ReceiptOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title='Logical Test'
                                    to='/logical'
                                    icon={<ReceiptOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title='Spatial Test'
                                    to='/spatial'
                                    icon={<ReceiptOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title='Concentration Test'
                                    to='/concentration'
                                    icon={<ReceiptOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        )}

                        {filteredItem.includes('Workshops') && (
                            <>
                                <Typography
                                    variant='h6'
                                    color={colors.title[100]}
                                    className='menu-tittle'
                                >
                                    {!isCollapsed ? 'Workshops' : <Divider className='divider' />}
                                </Typography>
                                <Item
                                    title='Workshop 1'
                                    to='/workshop'
                                    icon={<BugReportIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title='Workshop 2'
                                    to='/workshop'
                                    icon={<BugReportIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        )}
                        <Item
                            title='FAQ Page'
                            to='/faq'
                            icon={<HelpOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};
export default Sidebar;
