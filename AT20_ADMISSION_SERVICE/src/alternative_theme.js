/*
@node_command.js Copyright (c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20, Edificio Union No 1376, La Paz, Bolivia All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information "). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into with Jalasoft
*/

import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// color design tokens export
export const tokens = (mode) => ({
    ...(mode === 'dark'
        ? {
            primary: {
                100: '#52A5E0'
            },
            secondary: {
                100: '#6C757D'
            },
            success: {
                100: '#28A745'
            },
            info: {
                100: '#17A2B8'
            },
            warning: {
                100: '#FFC107'
            },
            danger: {
                100: '#DC3545'
            },
            title: {
                100: '#EFF3F5'
            },
            text: {
                100: '#C8CDD0'
            },
            lightText: {
                100: '#A0A7AC'
            },
            border: {
                100: '#2A3B47'
            },
            container: {
                100: '#212E36'
            },
            body: {
                100: '#0D1318',
                200: '#192229'
            },
            white: {
                100: '#FFFFFF'
            },
            black: {
                100: '#000000'
            }
        }
        : {
            primary: {
                100: '#1083D6'
            },
            secondary: {
                100: '#6C757D'
            },
            success: {
                100: '#28A745'
            },
            info: {
                100: '#17A2B8'
            },
            warning: {
                100: '#FFC107'
            },
            danger: {
                100: '#DC3545'
            },
            title: {
                100: '#2A3B47'
            },
            text: {
                100: '#697477'
            },
            lightText: {
                100: '#A0A7AC'
            },
            border: {
                100: '#EFF3F5'
            },
            container: {
                100: '#FFFFFF'
            },
            body: {
                100: '#FBFBFE',
                200: '#F2F2F4' // EBEBEE
            },
            white: {
                100: '#FFFFFF'
            },
            black: {
                100: '#000000'
            }
        })
});

// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode,
            ...(mode === 'dark'
                ? {
                    // palette values for dark mode
                    primary: {
                        main: colors.primary[100]
                    },
                    secondary: {
                        main: colors.secondary[100]
                    },
                    success: {
                        main: colors.success[100]
                    },
                    info: {
                        main: colors.info[100]
                    },
                    warning: {
                        main: colors.warning[100]
                    },
                    danger: {
                        main: colors.danger[100]
                    },
                    neutral: {
                        dark: colors.body[100],
                        main: colors.body[200],
                        light: colors.body[100]
                    },
                    background: {
                        default: colors.body[100]
                    }
                }
                : {
                    // palette values for light mode
                    primary: {
                        main: colors.primary[100]
                    },
                    secondary: {
                        main: colors.secondary[100]
                    },
                    success: {
                        main: colors.success[100]
                    },
                    info: {
                        main: colors.info[100]
                    },
                    warning: {
                        main: colors.warning[100]
                    },
                    danger: {
                        main: colors.danger[100]
                    },
                    neutral: {
                        dark: colors.body[100],
                        main: colors.body[200],
                        light: colors.body[100]
                    },
                    background: {
                        default: colors.body[100]
                    }
                })
        },
        typography: {
            fontFamily: ['Ubuntu', 'sans-serif'].join(','),
            fontSize: 12,
            h1: {
                fontFamily: ['Ubuntu', 'sans-serif'].join(','),
                fontSize: 40
            },
            h2: {
                fontFamily: ['Ubuntu', 'sans-serif'].join(','),
                fontSize: 32
            },
            h3: {
                fontFamily: ['Ubuntu', 'sans-serif'].join(','),
                fontSize: 24
            },
            h4: {
                fontFamily: ['Ubuntu', 'sans-serif'].join(','),
                fontSize: 16
            },
            h5: {
                fontFamily: ['Ubuntu', 'sans-serif'].join(','),
                fontSize: 16
            },
            h6: {
                fontFamily: ['Ubuntu', 'sans-serif'].join(','),
                fontSize: 14
            }
        }
    };
};

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {}
});

export const useMode = () => {
    const [mode, setMode] = useState('dark');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};
