import React from 'react';

import Navigation from './Navigation';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Navigation />
            <div className="page">
                {children}
                <Footer />
            </div>
        </React.Fragment>
    );
};

export default Layout;
