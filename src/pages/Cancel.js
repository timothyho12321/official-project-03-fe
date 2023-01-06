import React from 'react'

export default function Cancel() {
    return (
        <React.Fragment>
            <h3>
                Unfortunately, your payment did not proceed successfully.
                Would you like to try again?
            </h3>
            <a href='/checkout' className='btn btn-success btn-lg'>Back to checkout</a>
            <a href='/products' className='btn btn-warning btn-sm ms-2'>Continue shopping</a>
        
        </React.Fragment>

    )
}

