
import { Avatar } from './BlogCard'

function Appbar() {
  return (
    <div className='border-b flex justify-between px-10 py-4'>
        <div className='flex flex-col justify-center font-semibold'>Medium</div>
        <div>
            <Avatar authorName='Akash' size='big' />
        </div>
    </div>
  )
}

export default Appbar