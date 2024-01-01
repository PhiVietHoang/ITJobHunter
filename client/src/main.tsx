import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.css'
import store from '~/store'
import App from './App.tsx'
import Home from './pages/Home.tsx'
import EmployeeProfile from './pages/EmployeeProfile.tsx'
import EmployeeAuth from './pages/EmployeeAuth.tsx'
import EmployeeLoginForm from './components/EmployeeLoginForm.tsx'
import EmployeeRegisterForm from './components/EmployeeRegisterForm.tsx'
import EmployerAuth from './pages/EmployerAuth.tsx'
import EmployerLoginForm from './components/EmployerLoginForm.tsx'
import EmployerRegisterForm from './components/EmployerRegisterForm.tsx'
import Search from './pages/Search.tsx'
import EmployeeProfileEdit from './pages/EmployeeProfileEdit.tsx'
import EmployeeProfileEditEducation from './pages/EmployeeProfileEditEducation.tsx'
import EmployeeProfileEditCertification from './pages/EmployeeProfileEditCertification.tsx'
import EmployeeProfileEditSkills from './pages/EmployeeProfileEditSkills.tsx'
import EmployeeJobDetail from './pages/EmployeeJobDetail.tsx'
import EmployeeJobApplication from './pages/EmployeeJobApplication.tsx'
import EmployeeChat from './pages/EmployeeChat.tsx'
import EmployeeCompany from './pages/EmployeeCompany.tsx'
import EmployeeCompanyDetail from './pages/EmployeeCompanyDetail.tsx'

import AdminHome from './pages/AdminHome.tsx'
import AdminCompanyList from './pages/AdminCompanyList.tsx'
import AdminEmployeeList from './pages/AdminEmployeeList.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/profile/:id',
                element: <EmployeeProfile />
            },
            {
                path: '/profile/:id/edit',
                element: <EmployeeProfileEdit />
            },
            {
                path: '/profile/:id/edit/education',
                element: <EmployeeProfileEditEducation />
            },
            {
                path: '/profile/:id/edit/certification',
                element: <EmployeeProfileEditCertification />
            },
            {
                path: '/profile/:id/edit/skills',
                element: <EmployeeProfileEditSkills />
            },
            {
                path: '/search',
                element: <Search />
            },
            {
                path: '/companyAll',
                element: <EmployeeCompany />
            },
            {
                path: '/job/:id',
                element: <EmployeeJobDetail />
            },
            {
                path: 'job-applications',
                element: <EmployeeJobApplication />
            },
            {
                path: '/companyAllDetail/:id',
                element: <EmployeeCompanyDetail />
            }
        ]
    },
    {
        path: '/auth',
        element: <EmployeeAuth />,
        children: [
            {
                path: '/auth/login',
                element: <EmployeeLoginForm />
            },
            {
                path: '/auth/register',
                element: <EmployeeRegisterForm />
            }
        ]
    },
    {
        path: '/employer/auth',
        element: <EmployerAuth />,
        children: [
            {
                path: 'login',
                element: <EmployerLoginForm />
            },
            {
                path: 'register',
                element: <EmployerRegisterForm />
            }
        ]
    },
    {
        path: '/employee/chat',
        element: <EmployeeChat />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
