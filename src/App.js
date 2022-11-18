import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from './routes';
import DefaultLayout from './layouts';
import AuthComponent from './components/AuthComponent';

import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
    
    const token = cookies.get("TOKEN");

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        
                        const Page = route.component;

                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        if(route.path !== '/auth') {
                            
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        } else {
                            return (
                                <Route 
                                    key={index} 
                                    path={route.path} 
                                    element={
                                        token ? (
                                          <AuthComponent />
                                        ) : (
                                          <Navigate to="/login" replace />
                                        )
                                    }
                                />
                            );
                        }
                        
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
