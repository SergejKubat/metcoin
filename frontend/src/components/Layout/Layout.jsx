import React from 'react';

import SideBar from './SideBar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <SideBar />
            <div className="page">
                {children}
                <Footer />
            </div>
        </React.Fragment>
    );
};

export default Layout;
