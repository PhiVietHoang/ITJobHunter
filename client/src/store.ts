import { configureStore } from "@reduxjs/toolkit";
import { navbarReducer } from "./reducers/navbarReducer";
import { userReducer, usersReducer, engineersReducer, engineerReducer } from "./reducers/userReducer";
import { jobsReducer } from "./reducers/jobsReducer";
import { jobReducer, editJobReducer } from "./reducers/jobReducer";
import { companyReducer } from "./reducers/companyReducer";
import { applicationReducer } from "./reducers/applicationReducer";
import { companiesReducer } from "./reducers/companiesReducer";
import { applicationsReducer } from "./reducers/applicationsReducer";
import { uiLoaderReducer } from "./reducers/uiLoaderReducer";
import { searchReducer } from "./reducers/searchReducer";
import { studentProfileReducer } from "./reducers/studentProfileReducer";

const store = configureStore({
  reducer: {
     navbar: navbarReducer,
     user: userReducer,
     job: jobReducer,
     company: companyReducer,
     application: applicationReducer,
     jobs: jobsReducer,
     companies: companiesReducer,
     applications: applicationsReducer,
     uiLoader: uiLoaderReducer,
     search: searchReducer,
     editJob: editJobReducer,
     studentProfile: studentProfileReducer,
     users: usersReducer,
     engineers: engineersReducer,
     engineer: engineerReducer
  },
});

export default store;
