import React, { useState } from "react";
import { Navbar2 } from "./Navbar2";
import styles from "./LandingPage2.module.css";
import { Avatar, Box, Button, Heading, Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import Image from "./Image/Capture.png";
import { Footer } from "./Footer";
import {
  BsFillBagFill,
  BsFillFileTextFill,
  BsFillGeoAltFill,
  BsFillWalletFill,
} from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";

export const LandingPage2 = () => {
  const auth = useSelector((store) => store.auth.username);
  const dispatch=useDispatch();
  const navigate=useNavigate()

  console.log("auth", auth);
  const [skill,setSkill] =useState("");
  return (
    <>
      <Navbar2></Navbar2>

      <Box
        width={"100%"}
        height={"250px"}
        display={"flex"}
        style={{
          backgroundImage: `url("https://static.naukimg.com/s/5/105/i/dashboardbg.png")`,
        }}
      >
        <Box marginLeft={"10%"} w={"60%"} paddingTop={"3%"}>
          <Heading as="h5" className={styles.head}>
            Search Jobs
          </Heading>
          <input
            type="text"
            value={skill}
            onChange={(e)=>setSkill(e.target.value)}
            placeholder="Search jobs by Skills, Designation, Companies"
            style={{ padding: "1.2%", width: "80%" }}
          ></input>
          <button className={styles.searchBtn} onClick={handleSkill}>Search</button>
        </Box>
        <Box className={styles.profileBox}>
          <Box className={styles.avatarBox}>
            <Avatar margin={"auto"}></Avatar>
          </Box>
          <Heading as="h4" className={styles.name} fontSize={"20px"}>
            {auth}
          </Heading>

          <Box display={"flex"} margin={"auto"} marginTop={"4%"}>
            <img src={Image} alt="logo" />
          </Box>
          <p style={{ marginLeft: "4%", marginBottom: "5%" }}>
            Profile Performance
          </p>
          <Box w={"90%"} margin={"auto"} display={"flex"}>
            <Box className={styles.appearences}>
              <h3 style={{ color: "blue" }}>1</h3>
              <p style={{ color: "blue", fontSize: "13px" }}>
                Search Appearances
              </p>
            </Box>
            <Box className={styles.appearences}>
              <h3 style={{ color: "blue" }}>1</h3>
              <p style={{ color: "blue", fontSize: "13px" }}>
                Recruiter Actions
              </p>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box w={"100%"} background={"rgb(238,238,238)"} display={"flex"}>
        <Box w={"60%"} marginLeft={"4%"}>
          <Box className={styles.right_first_div}>
            <img
              src="https://static.naukimg.com/s/0/0/i/ambition_box.png"
              alt=""
              style={{ height: "40px", width: "80px", marginLeft: "4%" }}
            ></img>
            <h4 className={styles.first_div_heading}>
              Rate & Help your company win AmbitionBox Best Places to Work in
              India 2022 Award!
            </h4>
            <p style={{ paddingLeft: "5%" }}>Your opinion matters!</p>
            <Button
              className={styles.rate_company}
              style={{ background: "#2263ae" }}
            >
              Rate your Company
            </Button>
          </Box>
          <h4 className={styles.second_div_upper_heading}>Jobs</h4>
          <Box className={styles.second_div}>
            <Box paddingTop={"2%"} w={"60%"} marginLeft={"5%"}>
              <h4 className={styles.second_div_first_heading}>
                19 New Recommended Job(s)
              </h4>

              <h4
                style={{
                  fontSize: "15px",
                  marginBottom: "2%",
                  fontWeight: "5px",
                }}
              >
                Node Js Developer
              </h4>
              <p style={{ marginBottom: "3%", color: "blue" }}>
                CELESTIAL SYSTEMS PVT.LTD
              </p>
              <Box display={"flex"}>
                <BsFillBagFill style={{ marginRight: "2%", marginTop: "1%" }} />
                <p style={{ marginRight: "3%" }}>0-3 years</p>
                <BsFillGeoAltFill style={{ marginTop: "1%" }} />
                <p>Banglore/Bengaluru</p>
              </Box>
              <p style={{ marginLeft: "5%", marginTop: "2%" }}>javascript</p>
              <Box display={"flex"}>
                <BsFillFileTextFill className={styles.experince_icon} />
                <p style={{ marginTop: "2%" }}>
                  Knowledge of microservices using NodeJS - ORM concepts (either
                  good in sequelize,mongoose,Bookshelf,knex)
                </p>
              </Box>
              <Box display={"flex"}>
                <BsFillWalletFill
                  style={{ marginTop: "2%", marginRight: "2%" }}
                />
                <p style={{ marginTop: "2%", marginBottom: "1rem" }}>
                  Not Disclosed
                </p>
              </Box>
            </Box>
          </Box>
          <Box className={styles.third_div}>
            <h2 className={styles.third_div_heading}>
              New Jobs in My Job Alerts
            </h2>
            <div style={{ width: "100%",height:'1px', backgroundColor: 'rgb(192, 192, 192)' }}></div>
            <h3
              style={{ fontSize: "15px", color: "blue", textAlign: "center" }}
            >
              CREATE CUSTOM JOB ALERTS
            </h3>
            <p style={{ textAlign: "center", paddingBottom: "4%" }}>
              Stay informed about the latest jobs for you
            </p>
          </Box>
          <h4 className={styles.second_div_upper_heading}>Recruiters</h4>
          <Box className={styles.second_div}>
            <h2 className={styles.third_div_heading}>New Recruiter Messages</h2>
            <div style={{ width: "100%", height:'1px', backgroundColor: 'rgb(192, 192, 192)'}}></div>

            <p style={{ textAlign: "center" }}>
              You do not have any unread message.
            </p>
            <p style={{ textAlign: "center", paddingBottom: "4%" }}>
              {" "}
              Messages received from different recruiters will appear in this
              section.
            </p>
          </Box>

          <Box className={styles.third_div}>
            <h2 className={styles.third_div_heading}>Recruiter Connections</h2>
            <div style={{ width: "100%",height:'1px', backgroundColor: 'rgb(192, 192, 192)' }}></div>

            <Box className={styles.sixth_div_first_box}>
              <Box w={"40%"}>
                <Box display={"flex"} marginLeft={"15%"}>
                  <p className={styles.credit_score}>00</p>
                  <p style={{ paddingTop: "5%" }}>Credits Purchased</p>
                </Box>
                <Box display={"flex"} marginLeft={"15%"}>
                  <p className={styles.credit_score}>00</p>
                  <p style={{ paddingTop: "5%" }}>Credits Remaining</p>
                </Box>
              </Box>
              <Box w={"60%"}>
                <p>
                  Buy recruiter connections credits to contact more recruiters
                  hiring in your domain.
                </p>
                <Button
                  className={styles.buy_credits}
                  style={{ background: "blue" }}
                >
                  BUY CREDITS
                </Button>
              </Box>
            </Box>
          </Box>

          <Box className={styles.last_div}>
            <h2 className={styles.third_div_heading}>
              Recruiters hiring for candidates like you
            </h2>
            <div style={{ width: "100%", height:'1px', backgroundColor: 'rgb(192, 192, 192)'}}></div>

            <Box className={styles.sixth_div_first_box}>
              <Box w={"15%"}></Box>

              <Box w={"26%"}>
                <h2 style={{ fontWeight: "bold" }}>HR</h2>
                <p>Mera Transport Exchange Pvt Ltd</p>
                <p>Bengaluru / Bangalore</p>
              </Box>
              <Box w={"26%"} textAlign={"center"}>
                <Link to="">
                  <p className={styles.send_message}>SEND MESSAGE</p>
                </Link>
              </Box>
              <Box w={"26%"} textAlign={"center"}>
                <Button className={styles.follow_btn} background={"white"}>
                  FOLLOW
                </Button>
              </Box>
            </Box>

            <Box className={styles.sixth_div_first_box}>
              <Box w={"15%"}>
                <Avatar></Avatar>
              </Box>
              <Box w={"26%"}>
                <h2 style={{ fontWeight: "bold" }}>Akash patusi</h2>
                <p>Acliv Technologies</p>
                <p>Bengaluru / Bangalore</p>
              </Box>
              <Box w={"26%"} textAlign={"center"}>
                <Link to="">
                  <p className={styles.send_message}>SEND MESSAGE</p>
                </Link>
              </Box>
              <Box w={"26%"} textAlign={"center"}>
                <Button className={styles.follow_btn} background={"white"}>
                  FOLLOW
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box w={"25%"} marginLeft={"6%"}>
          <Box className={styles.right_first_box}>
            <Box w={"60%"} p={"5%"}>
              <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                Get real-time job updates & instant notifications only on the
                app!
              </p>
              <Box display={"flex"} marginTop={"7%"}>
                <p>Available on</p>
                <img
                  style={{ width: "20px", height: "20px", marginLeft: "2%" }}
                  src="https://static.naukimg.com/s/5/105/i/play-store.png"
                  alt=""
                ></img>
                <img
                  style={{ width: "20px", height: "20px" }}
                  src="https://static.naukimg.com/s/5/105/i/app-store.png"
                ></img>
              </Box>
            </Box>

            <Box w={"40%"} marginTop={"10%"}>
              <img
                style={{ width: "80px", height: "80px" }}
                src="https://static.naukimg.com/s/5/105/i/qrcode.png"
                alt=""
              ></img>
            </Box>
          </Box>

          <Box className={styles.right_second_div}>
            <img
              style={{ width: "120px", height: "40px" }}
              src="https://static.naukimg.com/s/4/123/i/ffLogo.png"
              alt=""
            ></img>
            <p
              style={{ fontSize: "1rem", fontWeight: "bold", marginTop: "4%" }}
            >
              Naukri Services you might be interested in
            </p>
            <p
              style={{ fontSize: "1rem", fontWeight: "bold", marginTop: "4%" }}
            >
              Be a Priority Applicant
            </p>
            <p>
              Increase your chances of getting shortlisted for the applied jobs
              and receiving calls from recruiters.
            </p>
            <p style={{ color: "blue", marginLeft: "60%", marginTop: "4%" }}>
              KNOW MORE
            </p>
            <p
              style={{ fontSize: "1rem", fontWeight: "bold", marginTop: "4%" }}
            >
              Increase your visibility by up to 3 times
            </p>
            <p>
              Get your profile marked as 'Featured' and get a higher rank when
              recruiters search for resumes.
            </p>
            <p style={{ color: "blue", marginLeft: "60%", marginTop: "4%" }}>
              KNOW MORE
            </p>
            <p style={{ marginTop: "4%" }}>
              Call 1800-572-5557 now! (Toll-free)
            </p>
          </Box>

          <Box className={styles.right_third_div}>
            <p
              style={{ fontSize: "1rem", fontWeight: "bold", marginTop: "4%" }}
            >
              FAQ
            </p>
            <p style={{ marginTop: "4%" }}>
              Click here for frequently asked questions.
            </p>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};
