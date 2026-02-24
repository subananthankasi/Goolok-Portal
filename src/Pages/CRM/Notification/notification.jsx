import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Topbar from "../../../Components/topbar/topbar";
import Footerbar from "../../../Components/footer/footer";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import '../crm.css';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Notification() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="All (4)" {...a11yProps(0)} />
              <Tab label="This Week (2)" {...a11yProps(1)} />
              <Tab label="Last Week (2)" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="card card1">
              <div className="card-body">
                <div className="row">
                  <div className="col-1">
                    <div className="text-center align-item-center bg_icon">
                    <AccountBalanceOutlinedIcon/>
                    </div> 
                    </div>
                  <div className="col-sm-12 col-lg-7">
                    <p className="card-text" style={{ fontSize: "14px" }}> 
                      Discover serenity and endless possibilities on
                      <strong> our newest property</strong>, the House Plot -
                      where nature meets convenience, and dreams take root
                    </p>
                  </div>
                  <div
                    className="col-sm-12 col-lg-4 text-end"
                    style={{ fontSize: "12px" }}
                  >
                    <p>24 Mar 2024</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card1">
              <div className="card-body">
                <div className="row">
                  <div className="col-1">
                    <div className="text-center align-item-center bg_icon">
                    <AccountBalanceOutlinedIcon/>
                    </div> 
                    </div>
                  <div className="col-sm-12 col-lg-7">
                    <p className="card-text" style={{ fontSize: "14px" }}> 
                      Discover serenity and endless possibilities on
                      <strong> our newest property</strong>, the House Plot -
                      where nature meets convenience, and dreams take root
                    </p>
                  </div>
                  <div
                    className="col-sm-12 col-lg-4 text-end"
                    style={{ fontSize: "12px" }}
                  >
                    <p>24 Mar 2024</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="card card1">
              <div className="card-body">
                <div className="row">
                  <div className="col-1">
                    <div className="text-center align-item-center bg_icon">
                    <AccountBalanceOutlinedIcon/>
                    </div> 
                    </div>
                  <div className="col-sm-12 col-lg-7">
                    <p className="card-text" style={{ fontSize: "14px" }}> 
                      Discover serenity and endless possibilities on
                      <strong> our newest property</strong>, the House Plot -
                      where nature meets convenience, and dreams take root
                    </p>
                  </div>
                  <div
                    className="col-sm-12 col-lg-4 text-end"
                    style={{ fontSize: "12px" }}
                  >
                    <p>24 Mar 2024</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="card card1">
              <div className="card-body">
                <div className="row">
                  <div className="col-1">
                    <div className="text-center align-item-center bg_icon">
                    <AccountBalanceOutlinedIcon/>
                    </div> 
                    </div>
                  <div className="col-sm-12 col-lg-7">
                    <p className="card-text" style={{ fontSize: "14px" }}> 
                      Discover serenity and endless possibilities on
                      <strong> our newest property</strong>, the House Plot -
                      where nature meets convenience, and dreams take root
                    </p>
                  </div>
                  <div
                    className="col-sm-12 col-lg-4 text-end"
                    style={{ fontSize: "12px" }}
                  >
                    <p>24 Mar 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
          <div className="card card1">
              <div className="card-body">
                <div className="row">
                  <div className="col-1">
                    <div className="text-center align-item-center bg_icon">
                    <AccountBalanceOutlinedIcon/>
                    </div> 
                    </div>
                  <div className="col-sm-12 col-lg-7">
                    <p className="card-text" style={{ fontSize: "14px" }}> 
                      Discover serenity and endless possibilities on
                      <strong> our newest property</strong>, the House Plot -
                      where nature meets convenience, and dreams take root
                    </p>
                  </div>
                  <div
                    className="col-sm-12 col-lg-4 text-end"
                    style={{ fontSize: "12px" }}
                  >
                    <p>24 Mar 2024</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card1">
              <div className="card-body">
                <div className="row">
                  <div className="col-1">
                    <div className="text-center align-item-center bg_icon">
                    <AccountBalanceOutlinedIcon/>
                    </div> 
                    </div>
                  <div className="col-sm-12 col-lg-7">
                    <p className="card-text" style={{ fontSize: "14px" }}> 
                      Discover serenity and endless possibilities on
                      <strong> our newest property</strong>, the House Plot -
                      where nature meets convenience, and dreams take root
                    </p>
                  </div>
                  <div
                    className="col-sm-12 col-lg-4 text-end"
                    style={{ fontSize: "12px" }}
                  >
                    <p>24 Mar 2024</p>
                  </div>
                </div>
              </div>
            </div>


          </CustomTabPanel>
          
          <CustomTabPanel value={value} index={2}>
                       <div className="card card1">
              <div className="card-body">
                <div className="row">
                  <div className="col-1">
                    <div className="text-center align-item-center bg_icon">
                    <AccountBalanceOutlinedIcon/>
                    </div> 
                    </div>
                  <div className="col-sm-12 col-lg-7">
                    <p className="card-text" style={{ fontSize: "14px" }}> 
                      Discover serenity and endless possibilities on
                      <strong> our newest property</strong>, the House Plot -
                      where nature meets convenience, and dreams take root
                    </p>
                  </div>
                  <div
                    className="col-sm-12 col-lg-4 text-end"
                    style={{ fontSize: "12px" }}
                  >
                    <p>24 Mar 2024</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card1">
              <div className="card-body">
                <div className="row">
                  <div className="col-1">
                    <div className="text-center align-item-center bg_icon">
                    <AccountBalanceOutlinedIcon/>
                    </div> 
                    </div>
                  <div className="col-sm-12 col-lg-7">
                    <p className="card-text" style={{ fontSize: "14px" }}> 
                      Discover serenity and endless possibilities on
                      <strong> our newest property</strong>, the House Plot -
                      where nature meets convenience, and dreams take root
                    </p>
                  </div>
                  <div
                    className="col-sm-12 col-lg-4 text-end"
                    style={{ fontSize: "12px" }}
                  >
                    <p>24 Mar 2024</p>
                  </div>
                </div>
              </div>
            </div>

          </CustomTabPanel>
        </Box>
      </div>
      <Footerbar />
    </>
  );
}
