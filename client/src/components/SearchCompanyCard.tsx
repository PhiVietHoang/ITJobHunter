import { RootState } from '~/store'
import { MoreVertical } from 'lucide-react'

const SearchCompanyCard = (props: RootState['employerAuth']['company']) => {
    return (
        <div className='p-3 flex flex-row rounded-lg shadow-md bg-gray-200 cursor-pointer relative'>
            <div className='flex-basis-40 w-20 overflow-hidden h-20 relative border-1 border-gray-400 rounded-lg bg-gray-100'>
                {props.companyLogo && (
                    <img
                        src={props.companyLogo}
                        alt='companyLogo'
                        className='w-full h-full object-contain object-center'
                    />
                )}
                {!props.companyLogo && (
                    <div className='flex items-center h-full justify-center'>
                        <span className='text-xs'>Avatar</span>
                    </div>
                )}
            </div>
            <div className='pl-4 flex-grow'>
                <h3 className='text-gray-800 text-17 font-bold leading-23'>{props.companyName}</h3>
            </div>
            <div className='pl-1 flex items-center justify-center'>
                <MoreVertical className='text-gray-500 text-18' />
            </div>
        </div>
    )
}

export default SearchCompanyCard
