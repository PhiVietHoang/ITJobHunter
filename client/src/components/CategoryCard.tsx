import { ChevronRight } from 'lucide-react'

const CategoryCard = (props: { name: string }) => {
    return (
        <div className='max-w-40 min-w-min py-5 pr-2 pl-6 flex justify-center items-center gap-4 border rounded-lg shadow-md hover:shadow-lg overflow-hidden'>
            <span className='text-lg font-semibold'>{props.name}</span>
            <ChevronRight />
        </div>
    )
}

export default CategoryCard
