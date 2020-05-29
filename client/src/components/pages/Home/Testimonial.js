
/**
 * Used in the homepage to showcase the mentors.
 */
import React from "react";
import "./Testimonial.css";

const Testimonial = (img, firstname, quote, role) => {
    // TODO: Populate this component once we have mentor data.
    let mentorInfo = (<></>)
    return (
        <div className="Testimonial-container">
            <div className="Testimonial-quote">{quote}</div>
            <div className="Testimonial-arrow"/>
        </div>
    )
}

export default Testimonial;