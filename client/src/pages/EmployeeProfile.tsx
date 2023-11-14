import { Briefcase, CalendarDays, Mail, MapPin, Pencil, Phone } from 'lucide-react'
import { useSelector } from 'react-redux'

import ProfileSection from '~/components/ProfileSection'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Badge } from '~/components/ui/badge'
import { RootState } from '~/store'

const EmployeeProfile = () => {
    const employee = useSelector((state: RootState) => state.employeeAuth.employee)

    if (!employee) return null

    return (
        <div className='mt-12 mx-auto w-[70%] flex flex-col gap-4'>
            <div className='p-12 bg-white rounded-3xl shadow-sm'>
                <div className='flex items-center gap-20'>
                    <div className='relative'>
                        <div className='absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] w-[180px] h-[180px] border-4 border-gray-300 rounded-full'></div>
                        <div className='w-40 h-40 rounded-full overflow-hidden'>
                            <img src={employee.avatar} alt='Profile Picture' />
                        </div>
                    </div>
                    <div className='grow flex flex-col gap-4'>
                        <div className='flex justify-start items-center gap-4 pb-4 text-2xl font-semibold border-b'>
                            {employee.name}{' '}
                            <button className='px-2 hover:text-gray-600'>
                                <Pencil className='w-5' />
                            </button>
                        </div>
                        <div className='flex justify-start items-start gap-4'>
                            <div className='pr-12 border-r'>
                                <ul className='text-[#474d6a]'>
                                    <li className='flex justify-start items-center gap-4'>
                                        <MapPin className='w-4' />
                                        {employee.address.country || 'Empty'}
                                    </li>
                                    <li className='flex justify-start items-center gap-4'>
                                        <Briefcase className='w-4' />
                                        {employee.experience || 'Empty'}
                                    </li>
                                    <li className='flex justify-start items-center gap-4'>
                                        <CalendarDays className='w-4' />
                                        {employee.joinDate.toString()}
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul className='text-[#474d6a]'>
                                    <li className='flex justify-start items-center gap-4'>
                                        <Phone className='w-4' />
                                        {employee.phoneNumber || 'Empty'}
                                    </li>
                                    <li className='flex justify-start items-center gap-4'>
                                        <Mail className='w-4' />
                                        {employee.email || 'Empty'}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
                <ProfileSection
                    title='Profile summary'
                    description='Your Profile Summary should mention the highlights of your career and education, what your professional interests are, and what kind of a career you are looking for. Write a meaningful summary of more than 50 characters.'
                >
                    <p className='mt-4 text-md text-gray-800'>{employee.description}</p>
                </ProfileSection>
                <ProfileSection
                    title='Skills'
                    description='Tell recruiters what you know or what you are known for e.g. Direct Marketing, Oracle, Java etc.
                        We will send you job recommendations based on these skills. each skill is separated by a comma.'
                >
                    {employee.skill.technical.length + employee.skill.soft.length > 0 ? (
                        <div>
                            <h3 className='text-md italic'>Technical skills</h3>
                            <div className='my-2 flex items-center'>
                                {employee.skill.technical.map((skill, index) => (
                                    <Badge key={`technical ${index}`}>{skill}</Badge>
                                ))}
                            </div>
                            <h3 className='text-md italic'>Soft skills</h3>
                            <div className='mt-2 flex items-center'>
                                {employee.skill.soft.map((skill, index) => (
                                    <Badge key={`soft ${index}`} variant='outline'>
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </ProfileSection>
                <ProfileSection
                    title='Education'
                    description='Please mention your education details. You can add details about your school, college and degree. This will increase your profile strength.'
                >
                    {employee.education.length > 0
                        ? employee.education.map((education, index) => (
                              <Badge key={index} variant='outline'>
                                  {education}
                              </Badge>
                          ))
                        : null}
                </ProfileSection>
                <ProfileSection
                    title='Certifications'
                    description='Add details of certifications you have achieved/completed.'
                >
                    {employee.certificates.length > 0
                        ? employee.certificates.map((cert, index) => (
                              <Badge key={index} variant='outline'>
                                  {cert}
                              </Badge>
                          ))
                        : null}
                </ProfileSection>
                <div className='w-full p-8 bg-white rounded-3xl shadow-sm'>
                    <h3 className='font-semibold'>Resume</h3>
                    <p className='mt-4 text-sm text-gray-600'>
                        Resume is the most important document recruiters look for. Recruiters generally do not look at
                        profiles without resumes.
                    </p>
                    <div className='w-full mt-6 py-8 flex justify-center items-center border-2 border-dotted border-[#275df555] rounded-xl'>
                        <div className='flex flex-col justify-center items-center gap-4'>
                            <div>
                                <Label
                                    htmlFor='resume-upload'
                                    className='px-6 py-2 text-sm text-[#275df5] border  border-[#275df5] rounded-full cursor-pointer'
                                >
                                    Upload Resume
                                </Label>
                                <Input type='file' id='resume-upload' className='hidden' />
                            </div>
                            <p className='text-sm text-gray-500'>Supported Formats: doc, docx, rtf, pdf, upto 2 MB</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeProfile
