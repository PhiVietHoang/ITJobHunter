import { Button } from './ui/button'

interface PaginationProps {
    currentPage: number
    totalPages: number
    handlePageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, handlePageChange }: PaginationProps) => {
    const handleClick = (page: number) => {
        handlePageChange(page)
    }

    if (totalPages <= 1) return null

    return (
        <nav className='mx-auto w-max'>
            <ul className='flex items-center'>
                {Array.from({ length: totalPages }, (_, i) =>
                    i === 0 || i === totalPages - 1 || Math.abs(currentPage - i) <= 2 ? (
                        <li key={i}>
                            <Button variant={i === currentPage ? 'default' : 'outline'} onClick={() => handleClick(i)}>
                                {i + 1}
                            </Button>
                        </li>
                    ) : null
                )}
            </ul>
        </nav>
    )
}

export default Pagination
