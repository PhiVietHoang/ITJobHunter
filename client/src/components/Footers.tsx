import { FC } from "react";
import Logo from "../assets/naukri_Logo.png";
import GitHub from "../assets/github.png";
import linkedin from "../assets/linkedin.svg";
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import { Link } from "react-router-dom";
import { footerLinks } from "../Constants/GeneralConstants.ts";

interface footerLinks {
 title: string;
 link: string;
}

const Footers: FC = () => {
 return (
   <footer className=" hidden w-full mx-auto z-10 py-5 md:flex items-center justify-around bg-white border-t-[2px] border-gray-200 mt-6 ">
     <div className="relative lg:w-[1128px] w-full mx-auto pt-16 pb-8 flex items-center justify-around">
       <div className="">
         <Link to="/" className="">
           <img src={Logo} alt="Logo" className="w-[150px] mb-8" />
         </Link>
         <p className="text-sm text-gray-500 mb-3">Connect with us</p>
         <ul className=" flex items-center justify-around">
           <li className="hover:underline hover:text-blue-700 ">
             <a href="https://github.com/abdullakhan8999">
               <img src={GitHub} alt="GitHub" className=" h-6" />
             </a>
           </li>
           <li className="hover:underline hover:text-blue-700 ">
             <a href="https://www.linkedin.com/in/abdullakhan8999/">
               <img src={linkedin} alt="linkedin" className=" h-6" />
             </a>
           </li>
           <li className="hover:underline hover:text-blue-700 ">
             <a href="https://www.instagram.com/abdulla_bin_samiullakhan/">
               <img src={instagram} alt="instagram" className=" h-6" />
             </a>
           </li>
           <li className="hover:underline hover:text-blue-700 ">
             <a href="#">
               <img src={facebook} alt="facebook" className=" h-6" />
             </a>
           </li>
         </ul>
       </div>
       <div className="">
        <ul className=" flex items-start justify-around gap-2 flex-col">
          {(footerLinks as footerLinks[]).map((link: footerLinks, i: number) =>
            i != 4 && i < 4 ? (
              <li key={i} className="hover:underline hover:text-blue-700 ">
               <Link to={link.link}>{link.title}</Link>
              </li>
            ) : (
              ""
            )
          )}
        </ul>
      </div>
      <div className="">
        <ul className=" flex items-start justify-around gap-2 flex-col">
          {(footerLinks as footerLinks[]).map((link: footerLinks, i: number) =>
            i >= 4 && i < 8 ? (
              <li key={i} className="hover:underline hover:text-blue-700 ">
               <Link to={link.link}>{link.title}</Link>
              </li>
            ) : (
              ""
            )
          )}
        </ul>
      </div>
      <div className="">
        <ul className=" flex items-start justify-around gap-2 flex-col">
          {(footerLinks as footerLinks[]).map((link: footerLinks, i: number) =>
            i >= 8 ? (
              <li key={i} className="hover:underline hover:text-blue-700 ">
               <Link to={link.link}>{link.title}</Link>
              </li>
            ) : (
              ""
            )
          )}
        </ul>
      </div>
     </div>
   </footer>
 );
};

export default Footers;
