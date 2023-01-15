import React from 'react'
import '../css/about.css'

export default function AboutUs() {
    return (
        <React.Fragment>

            <div>
                {/* <div id='picture-about-us'>

                </div> */}
                <h1 id="about-header-style" className='mt-2 ms-3'>Our Story</h1>
                <img src='/about-us-soap-image-crop.jpeg' id="image-about-us" alt="soap" />

                <div className='mt-2 ms-2 write-up'>
                    <p>
                        Soap Paradies is a all-natural cosmetic company specializing in making every
                        soap one at a time.
                        All our soaps are handmade and are like works of art, done with love and
                        care,
                        using the timeless cold-processed soap making method.
                        We continually innovate and test our product to bring the best and
                        latest soap to you. Each and every soap was created
                        with a real person's need in mind. We provide more benefits than
                        a commercial soap.
                        Only the finest natural ingredients are used in our soap so that it
                        would be gentle on your skin!
                    </p>
                </div>

            </div>
        </React.Fragment>


    )
}

