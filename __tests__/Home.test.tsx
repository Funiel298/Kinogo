import {render, screen} from '@testing-library/react'
import Home from '@/app/page'

it('should have skeletons',()=>{
    render(<Home/>)

    const myElem = screen.getAllByText('Skeleton')

    expect(myElem).toBeInTheDocument()
})