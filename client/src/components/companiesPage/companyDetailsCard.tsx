import React from "react";

const companyDetailsCard = ({ company }) => {
  const getDescriptionPreview = () => {
    const words = company.description.split(" ");
    return words.slice(0, 20).join(" ");
  };

  return (
    <div className=" group">
      <p className="text-sm group-hover:underline md:text-lg font-bold text-neutral-950 tracking-wider">
        {company.name}
      </p>
      <p className="text-xs md:text-sm text-slate-400 font-bold tracking-wider">
        {company.location}
      </p>
      <p className=" bg-slate-300 h-[2px] w-full rounded-full mx-1 mb-4"></p>

      <p className="text-xs md:text-sm font-bold text-neutral-950 tracking-wider mb-3">
        {getDescriptionPreview()}...
      </p>
      <div className="flex items-center justify-start gap-[20px] mb-2 flex-wrap">
        {company.companyCategories.map((category, i) => (
          <p
            key={i}
            className="text-xs md:text-sm font-bold text-sky-500 underline tracking-wider mb-3"
          >
            {category}
          </p>
        ))}
        <p className=" bg-slate-300 h-[20px] w-[2px] rounded-full mx-1"></p>

        <p className="text-xs md:text-sm font-bold tracking-wider mb-3">
          Company Size: {company.companySize}
        </p>
      </div>
      <div className="flex items-start justify-start mb-2 flex-wrap flex-col">
        <p className="text-xs md:text-sm font-bold tracking-wider mb-1">
          Departments:
        </p>
        <div className="flex items-start justify-start mb-2 flex-wrap">
          {company.companyDepartments.map((department, i) => (
            <p
              key={i}
              className="text-xs md:text-sm font-bold  tracking-wider  mr-2"
            >
              {department}
              {i === company.companyDepartments.length - 1 ? "" : ","}
            </p>
          ))}
        </div>
      </div>
      <p className="text-xs md:text-sm font-bold tracking-wider mb-3">
        Jobs Openings: {company.jobs.length}
      </p>
    </div>
  );
};

export default companyDetailsCard;
