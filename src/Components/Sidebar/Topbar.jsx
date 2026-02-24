import { useEffect, useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { findBreadcrumb } from "../../common/BreadCrump";
import { useBreadcrumb } from "../../common/BreadCrumpProvider";
import { Breadcrumb } from "antd";


const Topbar = ({ menuTree }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { pathname } = useLocation();
  const trail = menuTree && menuTree.length ? findBreadcrumb(menuTree, pathname) || [] : []

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem("breadcrumb");
    handleClose();
    setBreadcrumb([])
    localStorage.removeItem('logintype')
    localStorage.removeItem('token')
  };
  const userName = localStorage.getItem("token");
  const parsedUser = userName ? JSON.parse(userName) : null;
  const loginName = parsedUser?.Login === "admin" ? "Admin" : parsedUser?.staff
  const { breadcrumb, setBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    const saved = localStorage.getItem("breadcrumb");
    if (saved) {
      setBreadcrumb(JSON.parse(saved));
    }
  }, [setBreadcrumb]);
  return (

    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      backgroundColor="#e4e5e5"
    >
      {/*  Breadcrumb */}
      <Breadcrumb
        style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: "16px" }}
        items={[
          { title: breadcrumb.title ?? "Dashboard" }
        ]}
      />

      {/* User Profile */}
      <Box display="flex" alignItems="center">
        <AccountCircleIcon
          sx={{ fontSize: 35, cursor: "pointer" }}
          onClick={handleClick}
        />
        {parsedUser && (
          <span style={{ marginLeft: "8px", fontWeight: "600", fontSize: "14px" }}>
            {loginName ?? ""}
          </span>
        )}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>

  );
};

export default Topbar;
