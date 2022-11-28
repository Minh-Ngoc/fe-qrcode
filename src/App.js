import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import DefaultLayout from './layouts';
import AuthComponent from './pages/AuthComponent';
import ProtectedRoutes from './pages/ProtectedRoutes';

function App() {    

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
                        } else if(route.path === '/auth') {
                            return (
                                <Route
                                    key={index} 
                                    path={route.path}
                                    element={
                                        <ProtectedRoutes element={AuthComponent}/>
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
