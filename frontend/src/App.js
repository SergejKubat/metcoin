import React from "react";

import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import NavBar from "./components/Navbar";
import HomePage from "./components/Home";

const App = () => {
  return (
    <div className="app">
      <header className="navbar">
        <NavBar />
      </header>
      <main className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/blocks" />
              <Route path="/blocks/:hash" />
              <Route path="/transactions" />
              <Route path="/transactions/:hash" />
              <Route path="/charts" />
              <Route path="/info" />
            </Routes>
          </div>
        </Layout>
        <footer className="footer">
          <Typography.Title
            level={5}
            style={{ color: "#fff", textAlign: "center" }}
          >
            Metcoin <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/charts">Charts</Link>
            <Link to="/info">Info</Link>
          </Space>
        </footer>
      </main>
    </div>
  );
};

export default App;
