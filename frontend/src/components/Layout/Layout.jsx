import React from 'react';

import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            <SideBar />
            <div className="page">
                {children}
                <Footer />
            </div>
        </React.Fragment>
    );
};

export default Layout;
