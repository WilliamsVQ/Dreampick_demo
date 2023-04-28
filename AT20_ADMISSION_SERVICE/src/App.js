/*
@node_command.js Copyright (c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20, Edificio Union No 1376, La Paz, Bolivia All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information "). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into with Jalasoft
*/

import React, { useState, useEffect } from 'react';
import { ColorModeContext, useMode } from './alternative_theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
//USER
import {Dashboard} from './scenes/user/user_list';
import Form  from './scenes/user/new_User';
import {Login} from './scenes/user/login';
import Edit from './scenes/user/edit_User';
// import Form from './scenes/profileform';
// INTERVIEWS
import InterviewEnglish from './scenes/interviews/english';
import InterviewInformative from './scenes/interviews/informative';
import InterviewPsicologic from './scenes/interviews/psicologic';
// MEETING
import MyMeetings from './scenes/meeting/pages/create';
import NewMeeting from './scenes/meeting/pages';
import Waiting from './scenes/meeting/components/waiting.jsx';
import Room from './scenes/meeting/pages/room.jsx';
//QUESTIONNAIRE
import QuestionnaireForm from './scenes/questionnaire/questionnaire_form';
import Aptitude from './scenes/questionnaire/test_forms/aptitude';
import Concentration from './scenes/questionnaire/test_forms/concentration';
import Logical from './scenes/questionnaire/test_forms/logical';
import Reasoning from './scenes/questionnaire/test_forms/reasoning';
import Spatial from './scenes/questionnaire/test_forms/spatial';


//APOLLO GRAPH
import { ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'
//COMPILER WOKSHOP
import  Workshop  from "./scenes/workshop";

const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: createUploadLink({
      uri: 'http://localhost:5000/graphql',
    }),
  });

  function App() {
    const navigate = useNavigate();
    const [theme, colorMode] = useMode();
    const [isLoggedIn, setIsLoggedIn] = useState(
      localStorage.getItem('isLoggedIn') === 'true' // Load from local storage
    );
    const [loginData, setLoginData] = useState(
      JSON.parse(localStorage.getItem('loginData')) || null // Load from local storage
    );
  
    function handleLogin() {
      setIsLoggedIn(true);
    }
  
    function handleLoginData(data) {
      setLoginData(data);
    }
  
    useEffect(() => {
      localStorage.setItem('isLoggedIn', isLoggedIn);
      localStorage.setItem('loginData', JSON.stringify(loginData));
    }, [isLoggedIn, loginData]);
  
      function handleLogout() {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        navigate("/");
      }

  return (
  <ApolloProvider client={client}>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
          {isLoggedIn ? (
          <>
            <Sidebar loginData={loginData} />
            <main className="content">
              <Topbar handleLogout={handleLogout}/>
              <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/edit" element={<Edit loginData={loginData}/>} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/informative" element={<InterviewInformative />} />
                  <Route path="/psicologic" element={<InterviewPsicologic />} />
                  <Route path="/english" element={<InterviewEnglish />} />
                  <Route path="/questionnaire_form" element={<QuestionnaireForm />} />
                  <Route path="/aptitude" element={<Aptitude />} />
                  <Route path="/concentration" element={<Concentration />} />
                  <Route path="/logical" element={<Logical />} />
                  <Route path="/reasoning" element={<Reasoning />} />
                  <Route path="/spatial" element={<Spatial />} />
                  <Route path="/meeting" element={<NewMeeting loginData={loginData}/>} />
                  <Route path="/meeting/new" element={<MyMeetings />} />
                  <Route path="/meeting/waiting-room" element={<Waiting />} />
                  <Route path="/meeting/room/:id" element={<Room />} />
                  <Route path="/workshop" element={<Workshop />} />
              </Routes>
            </main>
          </>
            ) : (
          <main className="content container">
            <Login onLogin={handleLogin} loginData={handleLoginData} />
          </main>
        )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  </ApolloProvider>

  );
}

export default App;
