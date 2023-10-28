import { Image, Box, Button, Heading } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../Redux/auth/action";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
export const Register1 = () => {
  const [name, setName] = useState("");
  // const [lastName,setLastName] =useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [description,setDescription] =useState("sne");
  const [username,setUserName] =useState("");
const dispatch=useDispatch();
const navigate=useNavigate()


const auth=useSelector((store)=>store.auth.isAuth)

const payload={
  name,
  email,
  mobile,
  password,
  description,
  username
}
  const formSubmit=(e)=>{
    e.preventDefault();
    dispatch(registerUser(payload))
  }

if(auth){
  navigate("/home",{replace:true})
}
  

  return (
    <Box>
      <Box
        width={"100%"}
        height={"50px"}
        boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"}
      >
        <Link to="/">
          <Image
            src="https://static.naukimg.com/s/4/100/i/naukri_Logo.png"
            padding={3}
          ></Image>
        </Link>
      </Box>
      <Box display={"flex"} w={"100%"}>
        <Box
          w={"25%"}
          marginTop={"15%"}
          p={"2%"}
          marginRight={"10%"}
          marginLeft={"5%"}
          height={"450px"}
          borderRadius={"20px"}
          border={"1.5px dotted gray"}
        >
          <Image
            h={"40%"}
            w={"80%"}
            margin={"auto"}
            src={
              "https://static.naukimg.com/s/7/104/assets/images/green-boy.c8b59289.svg"
            }
          ></Image>

          <h3 style={{ textAlign: "center" }}>On registering, you can</h3>
          <Box display={"flex"} marginTop={"5%"}>
            <CheckCircleIcon style={{ marginRight: "5%", color: "green" }} />
            <p>Build your profile and let recruiters find you</p>
          </Box>

          <Box display={"flex"}>
            <CheckCircleIcon style={{ marginRight: "5%", color: "green" }} />
            <p>Get job postings delivered right to your email</p>
          </Box>
          <Box display={"flex"}  >
            <CheckCircleIcon style={{ marginRight: "5%", color: "green"}} />

            <p>Find a job and grow your career</p>
          </Box>
        </Box>
        <Box w={"70%"} marginTop={"5%"}>
          <Heading as="h4" fontSize={"36px"} marginBottom={"5%"}>
            Find a job & grow your career
          </Heading>

          <form
            className="form"
            encType="multipart/form-data"

              onSubmit={formSubmit}
          >
            <div style={{ marginBottom: "2%" }}>
              <h3
              // style={{fontSize:"20px"}}
              >
                *Full Name :
              </h3>

              <input
                type="text"
                className="inputs"
                placeholder="What is your name?"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "2%" }}>
              <h3
              // style={{fontSize:"20px"}}
              >
                *User Name :
              </h3>

              <input
                type="text"
                className="inputs"
                placeholder="Enter user name?"
                required
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

          
            <div style={{ marginBottom: "2%" }}>
              <h3>*Email Id :</h3>

              <input
                type="text"
                className="inputs"
                placeholder="Tell us your Email Id"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "2%" }}>
              <h3>*Password :</h3>
              <input
                type="password"
                className="inputs"
                placeholder="Create a password for your account"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "2%" }}>
              <h3>*Phone No :</h3>
              <input
                type="number"
                placeholder="Phone Number"
                className="inputs"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                size="10"
              />
            </div>

            <h3>Work Status</h3>
            <div style={{ display: "flex", marginBottom: "2%" }}>
              <div
              className="hovering"
                style={{
                  width: "35%",
                  border: "1px solid gray",
                  height: "100px",
                  marginRight: "2%",
                  borderRadius: "15px",
                  padding: "1%",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                
                }}
              >
                <h4 style={{ color: "blue" }}>I'm Experienced</h4>
                <p>I have work experience (excluding internships)</p>
              </div>
              <div
               className="hovering"
                style={{
                  width: "35%",
                  border: "1px solid gray",
                  height: "100px",
                  borderRadius: "15px",
                  padding: "1%",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
              >
                <h4 style={{ color: "blue" }}>I'm a Fresher</h4>
                <p>I am a student/ Haven't worked after graduation</p>
              </div>
            </div>
            {/* <h3>Resume</h3> */}

            <p>
              By clicking Register, you agree to the Terms and Conditions &
              Privacy Policy of Naukri.com
            </p>

            <input type="submit" value="Register" className="Btn"/>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
