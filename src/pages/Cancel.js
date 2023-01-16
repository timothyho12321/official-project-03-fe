import React from 'react'

export default function Cancel() {
    return (
        <React.Fragment>
            <h3 className='mt-3 ms-2 me-2'>
                Unfortunately, your payment did not proceed successfully.
                Would you like to try again?
            </h3>
            <a href='/checkout' className='btn btn-success btn-lg ms-2'>Back to checkout</a>
            <a href='/products' className='btn btn-warning btn-sm ms-2'>Continue shopping</a>
        
        </React.Fragment>

    )
}

