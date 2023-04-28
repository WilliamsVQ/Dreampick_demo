import { useState } from 'react';
import { Box, Button, Stack, InputLabel, Select, MenuItem, useTheme, TextareaAutosize, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { tokens } from '../../alternative_theme';
import Header from '../../components/header';
import { compilerCode } from '../../apis/compilerService';
import { useMutation } from '@apollo/client'
import { COMPILER } from "../../graphql/user";
import imageTest from '../../scenes/workshop/workshop.png';
import './styleWorkshop.css';

export default function Workshop() {
    const [codingText, setCodingText] = useState('');
    const [codeLanguage, setCodeLanguage] = useState('');
    const [compileCode, setCompileCode] = useState('');
    const [compiler] = useMutation(COMPILER);

    const handleChangeLanguage = (event) => {
        setCodeLanguage(event.target.value);
        setCompileCode(' ');
    };

    const handleChangeCodingText = (event) => {
        setCodingText(event.target.value);
    };
    const buttonRunCode = async ({ resetForm }) => {
        const languages = {
            '.java': 'java',
            '.js': 'javascript',
            '.cs': 'c_sharp',
            '.py': 'python'
        };
        const language = languages[codeLanguage];
        const blob = new Blob([codingText], { type: 'text/plain;charset=utf-8' });
        const file = new File([blob], `code${codeLanguage}`, { type: 'text/plain;charset=utf-8' });
        const comp = await compiler({ variables: { file, language } });
        setCompileCode(comp.data.compiler);
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box className="box" >
            <Header title='Technical test' subtitle='Resolve the problem' />
            <Box>
                <img src={imageTest} />
            </Box>
            <Stack spacing={2} direction="row" className='selector'>
                <FormControl variant="filled" sx={{ width: '100%' }}>
                    <InputLabel>Select a Language</InputLabel>
                    <Select name="language" value={codeLanguage} onChange={handleChangeLanguage}>
                        <MenuItem value='.java'>Java</MenuItem>
                        <MenuItem value='.js'>Javascript</MenuItem>
                        <MenuItem value='.cs'>C#</MenuItem>
                        <MenuItem value='.py'>Python</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" onClick={buttonRunCode} sx={{ backgroundColor: colors.primary[100] }}>
                    Run Your Code
                </Button>
            </Stack>

            <Stack spacing={2} sx={{ display: 'flex', width: '100%', marginTop: theme => theme.spacing(2) }}>
                <Box sx={{ flexGrow: 1, marginRight: theme => theme.spacing(1) }}>
                    <TextareaAutosize
                        maxRows={4}
                        name='coding'
                        aria-label="maximum height"
                        value={codingText}
                        onChange={handleChangeCodingText}
                        className='input'
                    />
                </Box>
                <Box sx={{ marginRight: theme => theme.spacing(1) }}>
                    <TextField
                        value={compileCode}
                        label="Output"
                        multiline
                        rows={4}
                        className='output'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
            </Stack>
        </Box>
    );
}
