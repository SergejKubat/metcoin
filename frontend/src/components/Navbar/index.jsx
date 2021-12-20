import React from "react";

import { Link } from "react-router-dom";
import { Button, Menu, Typography, Avatar } from "antd";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
} from "@ant-design/icons";

import logo from "../../assets/images/logo.png";

const NavBar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={logo} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Metcoin</Link>
        </Typography.Title>
      </div>
      <Menu theme="dark">
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />}>
          <Link to="/blocks">Blocks</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/transactions">Transactions</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/charts">Charts</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/info">Info</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default NavBar;
