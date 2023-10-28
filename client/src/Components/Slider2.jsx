import Carousel from "react-elastic-carousel";
import Item from "./Item2";
import "./styles2.css";
import { Box, Image } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import {BsFillGeoAltFill} from "react-icons/bs"
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1000, itemsToShow: 4 }
];

export const Slider2=()=> {
  return (
    <div className="slide">
      <Carousel breakPoints={breakPoints}>
        {arr.map((item)=>(

        <Item>
        <Box className="perdiv">
          <img style={{height:"70px", width:"70px"}} src={item.image}/>
          <h4>{item.title}</h4>
          <Box display={'flex'}>
          <p style={{marginRight:"10px"}}>{item.subtitle}</p>
        

          </Box>
        

        </Box>
          </Item>
        ))}
        
      </Carousel>
    </div>
  );
}



const arr=[
  {
    image:"https://static.naukimg.com/s/0/0/i/trending-naukri/remote.svg",
    title:"Remote",
    subtitle:"743 Jobs",
   
  },
  {
    image:"https://static.naukimg.com/s/0/0/i/trending-naukri/mnc.svg",
    title:"MNC",
    subtitle:"2.9K+ Jobs",
   
  },
  {
    image:"https://img.naukri.com/logo_images/v3/25292.gifhttps://static.naukimg.com/s/0/0/i/trending-naukri/freshers.svg",
    title:"Fresher",
    subtitle:"55.1K+ Jobs",
   
  },
  {
    image:"https://img.naukri.com/logo_images/v3/54602.gif",
    title:"Startup",
    subtitle:"433 Jobs",
   
  },
  {
    image:"https://static.naukimg.com/s/0/0/i/trending-naukri/software.svg",
    title:"Sofware &IT",
    subtitle:"7.9k+ Jobs",
  
  },
  {
    image:"https://static.naukimg.com/s/0/0/i/trending-naukri/sales.svg",
    title:"Sales",
    subtitle:"9.3K+ Jobs",
   
  },
  {
    image:"https://static.naukimg.com/s/0/0/i/trending-naukri/engineering.svg",
    title:"Engineering",
    subtitle:"1.5K+ Jobs",
  
  }

]