
import styles from "./Navbar2.module.css"
import { Link } from "react-router-dom"
import { Button } from "@chakra-ui/react"
import {BsFillBellFill} from "react-icons/bs"
export const  Navbar2=()=> {


    return (
        <>
        <div>
            <div  className={styles.background}
              //  style={{ backgroundImage: `url("https://static.naukimg.com/s/7/109/assets/images/homepagebgImage.d92f90dc.webp")` }}
                
              >
             
                <header className={styles.header}>
                    <ul className={styles.navbar} >
                        <div className={styles.image}>
                           <Link to ="/home"><img style={{marginTop:"20px"}} src="https://static.naukimg.com/s/4/100/i/naukri_Logo.png" alt="logo" /></Link> 
                        </div>
                        <li className={styles.drop_one}>
                            <span >JOBS</span>
                            <div className={styles.menu_experiment}>
                                <div className={styles.menu_one}>
                                    <ul>
                                    
                                        <li>Search jobs</li>
                                        <li>Create Free Job Alert</li>
                                       
                                    </ul>
                                   
                                    <ul>
                                      <h3>Jobs by Location</h3>
                                        <li>Jobs by Category</li>
                                        <li>Jobs by Skill</li>
                                        
                                        <li>Jobs by Designation</li>
                                        <li>Browse All Jobs</li>
                                      
                                     
                                    </ul>
                                    <ul>
                                      <h3>Jobs by location</h3>
                                        <li>Jobs in Delhi</li>
                                        <li>Jobs in Mumbai</li>
                                        <li>Jobs in Pune</li>
                                        <li>Jobs in Banglore</li>
                                        <li>Jobs in Hyderabad</li>
                                        <li>Jobs in Chennai</li>
                                     
                                    </ul>

                                </div>
                            </div>
                        </li>
                        <li className={styles.drop_two}>
                          <Link to="/recruiter">   <span>RECRUITERS</span></Link> 
                            <div className={styles.menu_experiment}>
                                <div className={styles.menu_two}>
                                    <ul>
                                        <li>Browse All Recruiters</li>
                                        <li>Recruiter Connection</li>
                                        <li>Go To NaukriRecruiter</li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className={styles.drop_three}>
                            <span>COMPANIES</span>
                            <div className={styles.menu_experiment}>
                                <div className={styles.menu_three}>
                                    <ul>
                                     <li>Browse All Companies</li>

                                     <li>About Companies</li>
                                     <li>Interview Questions</li>
                                     <li>Write Company Review</li>
                                     <li>Write Interview Advice</li>
                                     <li>Company Reviews</li>
                                     <li>Company Salaries</li>
                                    </ul>
                                   
                                  
                                </div>
                            </div>
                        </li>
                        <li className={styles.drop_four}>
                            <span>TOOLS</span>
                            <div className={styles.menu_experiment}>
                                <div className={styles.menu_four}>
                                    <ul>
                                        <li>Career Dashboard</li>
                                        <li>Your next career move</li>
                                        <li>Skills Trends</li>
                                        <li>Naukri Lab </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className={styles.drop_five}>
                            <span>SERVICES</span>
                            <div className={styles.menu_experiment}>
                                <div className={styles.menu_five}>
                                    <ul>
                                        <li><h3> Resume writing</h3></li>
                                        <li>Text Resume</li>
                                        <li>Visual Resume</li>
                                      <li>Resume Quality Score-Free</li>
                                      <li>Resume Samples</li>
                                        <li><h3>Jobs For You</h3></li>
                                       <li> Jobs4U</li>
                                       
                                     
                                    </ul>
                                    <ul>
                                        <li><h3>Recruiter Reach</h3></li>
                                        <li>Resume display</li>
                                        <li>Priority Applicant</li>
                                        <li>Recruiter Connection</li>
                                        <li>Job Search Booster</li>
                                      <li><h3>Other</h3></li>
                                      <li>Help / FAQ</li>
                                      <li>Career Advice</li>
                                      <li>Contact Us</li>
                                      <li><h3>Monthly Subscriptions</h3></li>
                                      <li>Basic & Premium Plans</li>
                                      
                                    </ul>
                                    <ul>
                                        <li><h3>Courses / Certifications</h3></li>

                                      <li> Data Science </li>
                                      <li>Machine Learning </li>
                                      <li>Big Data</li>
                                      <li>Programming</li>
                                      <li>Business Analytics</li>
                                      <li>Project Management</li>
                                      <li> Web Design</li>
                                      <li>DevOps and Cloud computing</li>
                                      <li>Marketing</li>
                                      <li>Accounting  and Finance</li>
                                      <li>Banking</li>
                                      <li>Logistics and Supply Chain</li>
                                      <li>Strategy and Leadership</li>
                                        
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className={styles.drop_six}>
                            <span>MORE</span>
                            <div className={styles.menu_experiment}>
                                <div className={styles.menu_six}>
                                    <ul>
                                        <li><h3>Career Tools</h3></li>
                                       <li>Naukri Blog</li>
                                       <li>FAQ</li>
                                       <li>Take Home Calculator</li>
                                       <li><h3>Study Abroad</h3></li>
                                       <li>MBA</li>
                                       <li>MS</li>
                                       <li>SOP</li>
                                       <li>GMAT</li>
                                       <li>IELTS</li>
                                    </ul>
                                    <ul>
                                       <li><h3>Top Courses & Colleges</h3></li>
                                       <li>MBA</li>
                                       <li>MBA Colleges in India</li>
                                       <li>Top MBA Colleges</li>
                                       <li>Engineering</li>
                                       <li>Engineering Colleges</li>
                                       <li>Top Engineering Colleges</li>
                                       <li>BBA / BBM</li>
                                       <li>BHM</li>
                                       <li>BCA,DCA,BSc CS/IT</li>
                                    </ul>
                                    <ul>
                                       <li><h3>Top Exams</h3></li>
                                       <li>JEE Main</li>
                                       <li>JEE Advanced</li>
                                       <li>BCECE</li>
                                       <li>GATE</li>
                                       <li>CAT</li>
                                       <li>SNAP</li>
                                       <li>MAT</li>
                                       <li>NEET</li>
                                       <li>SBI PO</li>
                                       <li>IBPS PO</li>

                                    </ul>
                                </div>
                            </div>
                        </li>
                        {/* <li><span> {data.length !== 0 ? <Link style={{ color: 'white' }} to="/profile">{data[0].name} </Link> : <Link style={{ color: 'white' }} to="/login">LOGIN</Link>} </span></li> */}
                        {/* <li style={{ marginLeft: 100 }} className={styles.drop_seven}>
                       
                            <div className={styles.menu_experiment}>
                                <div className={styles.menu_seven}>
                                    <ul>
                                        <li>Job recommendations</li>
                                    </ul>
                                </div>
                            </div>
                        </li> */}
                      {/* <li className={styles.drop_seven}>
                            <span><BsFillBellFill style={{height:"15px"}}/></span>

                            </li> */}
                   
                       
                 </ul>
                </header>
             
            </div>
        </div>
        </>
    )

}



