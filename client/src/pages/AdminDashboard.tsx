import AdminSideBar from "../components/AdminSidebar";
const AdminDashboard = () => {
return (
<div>
<AdminSideBar></AdminSideBar>
<section className="bg-gray-2 dark:bg-dark pt-20 pb-10 lg:pt-[120px] lg:pb-20">
   <div className="container mx-auto">
      <div className="flex flex-wrap -mx-4">
         <div className="w-full px-4 md:w-1/2 xl:w-1/3">
            <div
               className="mb-10 overflow-hidden duration-300 bg-white rounded-lg dark:bg-dark-2 shadow-1 hover:shadow-3 dark:shadow-card dark:hover:shadow-3"
               >
               <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h3>
                     <a
                        href="javascript:void(0)"
                        className="text-dark dark:text-white hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                        >
                     Total Employees
                     </a>
                  </h3>
                  <p
                     className="text-base leading-relaxed text-body-color dark:text-dark-6 mb-7"
                     >
                     500
                  </p>
                  <a
                     href="javascript:void(0)"
                     className="inline-block py-2 text-base font-medium transition border rounded-full text-body-color hover:border-primary hover:bg-primary border-gray-3 px-7 hover:text-white dark:border-dark-3 dark:text-dark-6"
                     >
                  View Details
                  </a>
               </div>
            </div>
         </div>
         <div className="w-full px-4 md:w-1/2 xl:w-1/3">
            <div
               className="mb-10 overflow-hidden duration-300 bg-white rounded-lg dark:bg-dark-2 shadow-1 hover:shadow-3 dark:shadow-card dark:hover:shadow-3"
               >
               <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h3>
                     <a
                        href="javascript:void(0)"
                        className="text-dark dark:text-white hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                        >
                    Total Companies
                     </a>
                  </h3>
                  <p className="text-base leading-relaxed text-body-color mb-7">
                     200
                  </p>
                  <a
                     href="javascript:void(0)"
                     className="inline-block py-2 text-base font-medium transition border rounded-full text-body-color hover:border-primary hover:bg-primary border-gray-3 px-7 hover:text-white dark:border-dark-3 dark:text-dark-6"
                     >
                  View Details
                  </a>
               </div>
            </div>
         </div>
         <div className="w-full px-4 md:w-1/2 xl:w-1/3">
            <div
               className="mb-10 overflow-hidden duration-300 bg-white rounded-lg dark:bg-dark-2 shadow-1 hover:shadow-3 dark:shadow-card dark:hover:shadow-3"
               >
               <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h3>
                     <a
                        href="javascript:void(0)"
                        className="text-dark dark:text-white hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                        >
                     Total Jobs
                     </a>
                  </h3>
                  <p className="text-base leading-relaxed text-body-color mb-7">
                     700
                  </p>
                  <a
                     href="javascript:void(0)"
                     className="inline-block py-2 text-base font-medium transition border rounded-full text-body-color hover:border-primary hover:bg-primary border-gray-3 px-7 hover:text-white dark:border-dark-3 dark:text-dark-6"
                     >
                  View Details
                  </a>
               </div>
            </div>
         </div>
         <div className="w-full px-4 md:w-1/2 xl:w-1/3">
            <div
               className="mb-10 overflow-hidden duration-300 bg-white rounded-lg dark:bg-dark-2 shadow-1 hover:shadow-3 dark:shadow-card dark:hover:shadow-3"
               >
               <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h3>
                     <a
                        href="javascript:void(0)"
                        className="text-dark dark:text-white hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                        >
                     Total Job Applications
                     </a>
                  </h3>
                  <p className="text-base leading-relaxed text-body-color mb-7">
                     1321
                  </p>
                  <a
                     href="javascript:void(0)"
                     className="inline-block py-2 text-base font-medium transition border rounded-full text-body-color hover:border-primary hover:bg-primary border-gray-3 px-7 hover:text-white dark:border-dark-3 dark:text-dark-6"
                     >
                  View Details
                  </a>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
</div>   
);
};
export default AdminDashboard;
