import React from 'react'

export default function Success() {
    return (
        <React.Fragment>
            <h1 className='mt-3 ms-2 me-2'>
                Thank you for shopping with us.
                See you again!
            </h1>
            <a href='/about' className='btn btn-success btn-sm ms-2'>See 'About Us'</a>
            
        </React.Fragment>

    )
}

