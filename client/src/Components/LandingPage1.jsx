import React from "react";
import { Box, Button, Input, Image } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import styles from "./LandingPage1.module.css";
import { BsFacebook, BsLinkedin, BsInstagram, BsTwitter } from "react-icons/bs";
import { Slider } from "./Slider";
import { Slider2 } from "./Slider2";
import { Slider3 } from "./Slider3";
import { Slider4 } from "./Slider4";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar1";
export const LandingPage1 = () => {
  return (
    <Box>
      <Navbar></Navbar>

      <Box display={"flex"} margin={"auto"}>
        <Heading as="h1" style={{ fontWeight: "bolder", margin: "auto" }}>
          Find your dream job now
        </Heading>
      </Box>
      <Box display={"flex"} margin={"auto"}>
        <p style={{ margin: "auto" }}>5 lakh+ jobs for you to explore</p>
      </Box>
      <Box
        w={"80%"}
        p={4}
        display="flex"
        margin="auto"
       
        borderRadius={"27px"}
        justifyContent={"space-around"}
        boxShadow={" rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
      >
        <SearchIcon paddingTop={"0.5%"} height={"40px"} />
        <Input
          type="text"
          placeholder="Enter skills / designations / companies"
          padding={5}
          w={"80%"}
          border={"none"}
        />

        <Button background={"blue"} color={"white"} p={4} borderRadius={"10px"}>
          Search
        </Button>
      </Box>
      <Box
        w={"60%"}
        margin={"auto"}
        marginTop={"4%"}
        display={"flex"}
        borderRadius={"10px"}
        border={"1.5px dotted gray"}
      >
        <Box w={"30%"}>
          <ol style={{ padding: "25px" }}>
            <li style={{ padding: "3px" }}>Get discoverd</li>
            <li style={{ padding: "3px" }}>Get contacted</li>
            <li style={{ padding: "3px" }}>Get hired</li>
          </ol>
        </Box>
        <Box w={"30%"} paddingTop={"30px"}>
          <Box display={"flex"} margin={"2px"}>
            <Image
              src={"https://img.naukimg.com/logo_images/groups/v1/166008.gif"}
              height={"20%"}
              width={"20%"}
            ></Image>
            <Image
              src={"https://img.naukimg.com/logo_images/groups/v1/224154.gif"}
              height={"20%"}
              width={"20%"}
            ></Image>
          </Box>
          <Box display={"flex"} margin={"2px"}>
            <Image
              src={"https://img.naukimg.com/logo_images/groups/v1/15932.gif"}
              height={"20%"}
              width={"20%"}
            ></Image>
            <Image
              src={"https://img.naukimg.com/logo_images/groups/v1/509622.gif"}
              height={"20%"}
              width={"20%"}
            ></Image>
          </Box>
        </Box>
        <Box>
          <h2>Become searchable by top companies in your domain</h2>

          <p>Companies search for candidate CVs directly for open positions</p>
          <Button
            background={"rgb(255,117,85)"}
            borderRadius={"20px"}
            color={"white"}
          >
            Register for free
          </Button>
        </Box>
      </Box>

      <Heading
        as="h4"
        textAlign={"center"}
        paddingTop={"20px"}
        fontSize={"30px"}
      >
        Jobs you may be interested in
      </Heading>

      <Box
        display={"flex"}
        margin={"auto"}
        width={"50%"}
        p={"1%"}
        className={styles.jobsButton}
      >
        <Button>Full Stack Developer(308)</Button>
        <Button> Front End Developer(55)</Button>
        <Button>Back End Developer(89)</Button>
      </Box>
      <Slider></Slider>
      <Heading as="h4" textAlign={"center"} padding={"20px"} fontSize={"30px"}>
        Trending on Naukri today
      </Heading>
      <Slider2></Slider2>

      <Heading as="h5" textAlign={"center"} padding={"20px"} fontSize={"30px"}>
        Featured companies actively hiring
      </Heading>
      <Slider3></Slider3>
      <Heading as="h4" textAlign={"center"} padding={"20px"} fontSize={"30px"}>
        Explore top companies hiring now
      </Heading>
      <Slider4></Slider4>
      <Box
        width={"80%"}
        display={"flex"}
        margin={"auto"}
        background={"rgb(241,245,255)"}
        borderRadius={"25px"}
        marginTop={"5%"}
        marginBottom={"5%"}
      >
        <Box padding={10}>
          <Heading as="h3" fontSize={"30px"}>
            10M+ users are on the Naukri app
          </Heading>
          <Box width={"80%"} display={"flex"} marginBottom={"15px"}>
            <Box marginRight={"12%"} marginBottom={"15px"}>
              <p>Get real-time job updates & more!</p>
              <Box display={"flex"} marginBottom={"15px"}>
                <input type="text" placeholder="Enter mobile number..." />
                <button
                  style={{ background: "blue", color: "white", padding: "5px" }}
                >
                  Get Link
                </button>
              </Box>
              <Box display={"flex"} marginBottom={"15px"}>
                <Image
                  src={
                    "https://static.naukimg.com/s/0/0/i/download-app-link/Gplay.png"
                  }
                ></Image>
                <Image
                  src={
                    "https://static.naukimg.com/s/0/0/i/download-app-link/Appstore.png"
                  }
                ></Image>
              </Box>
            </Box>
            <Box>
              <Image
                src={
                  "https://static.naukimg.com/s/0/0/i/download-app-link/qr-code.svg"
                }
                h={"60px"}
                w={"60px"}
              ></Image>
            </Box>
          </Box>
        </Box>
        <Box>
          <Image
            src={
              "https://static.naukimg.com/s/0/0/i/download-app-link/MaskGroup_v4.png"
            }
          ></Image>
        </Box>
      </Box>
      <Box
        w={"100%"}
        height={"300px"}
        marginBottom={"5%"}
        padding={4}
        display={"flex"}
        boxShadow={
          "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px"
        }
      >
        <Box w={"20%"} padding={"2%"}>
          <Image
            src={"https://static.naukimg.com/s/4/100/i/naukri_Logo.png"}
          ></Image>
          <p style={{ marginBottom: "5%" }}>Connect with us</p>
          <Box display={"flex"}>
            <BsFacebook style={{ marginRight: "15px" }} />
            <BsTwitter style={{ marginRight: "15px" }} />
            <BsInstagram style={{ marginRight: "15px" }} />
            <BsLinkedin style={{ marginRight: "15px" }} />
          </Box>
        </Box>
        <Box w={"20%"} paddingTop={"3%"}>
          <Link to="">About us</Link>
          <br></br>
          <br></br>
          <Link to="">Careers</Link>
          <br></br>
          <br></br>
          <Link to="">Employer home</Link>
          <br></br>
          <br></br>
          <Link to="">Sitemap</Link>
        </Box>
        <Box w={"20%"} paddingTop={"3%"}>
          <Link to="">Help center</Link>
          <br></br>
          <br></br>
          <Link to="">Summons/Notices</Link>
          <br></br>
          <br></br>
          <Link to="">Grievances</Link>
          <br></br>
          <br></br>
          <Link to="">Report isuue</Link>
        </Box>
        <Box w={"20%"} paddingTop={"3%"}>
          <Link to="">Privacy policy</Link>
          <br></br>
          <br></br>
          <Link to="">Terms & conditions</Link>
          <br></br>
          <br></br>
          <Link to="">Fraud alert</Link>
          <br></br>
          <br></br>
          <Link to="">Trust safety</Link>
        </Box>

        <Box w={"30%"} border={"0.1px solid gray"}
        borderRadius={"15px"}
        height={"40%"} p={4} marginTop={"5%"}>
          <h5>Apply on the go</h5>
          <p>Get real-time job updates on our App</p>
          
          <Box display={"flex"} marginBottom={"15px"}>
                <Image
                  src={
                    "https://static.naukimg.com/s/0/0/i/download-app-link/Gplay.png"
                  }
                  w={"40%"}
                ></Image>
                <Image
                  src={
                    "https://static.naukimg.com/s/0/0/i/download-app-link/Appstore.png"
                  }
                  w={"40%"}
                ></Image>

               
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
