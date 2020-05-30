import React, { Component } from "react";
import { RoundedButtonLink } from "../../modules/RoundedButton.js";
const APPLY_MENTOR = "https://forms.gle/6vmx1AMtjzw3kbZY9";
const APPLY_STUDENT = "https://forms.gle/W2GGGDUW3J6NEZnYA";
const moveBoxDown = (box) => {
    return (
        <div style={{ paddingTop: "5em" }}>
            {box}
        </div>
    )
}

export default () => {

    const applyButtons = moveBoxDown((
        <div className="container">
            <div className="row justify-content-md-center">

                <div className="col-md-3  Home-apply">
                    <RoundedButtonLink label={"Apply as a Student "} link={APPLY_STUDENT} newTab />
                </div>
                <div className="col-md-3  Home-apply">
                    <RoundedButtonLink label={"Apply as a Mentor"} link={APPLY_MENTOR} />
                </div>

            </div>
        </div>
    ));
    const titleSection = (
        <div className="u-screenCenter Home-flex Home-titleContainer">
            <div className="col-md-auto">
                <div className="Home-title">Explore new projects and build connections</div>
                <div className="Home-subtitle">Join the community of innovative college students, Explore existing projects or post your own for others to join, Get access to industry professional mentors for your group.</div>
                {applyButtons}
            </div>
        </div>
    );
    return (
        <div class="container">
            <div class="row">
                <div className="Home-title">Explore new projects and build connections</div>
                <div className="Home-subtitle">Join the community of innovative college students, Explore existing projects or post your own for others to join, Get access to industry professional mentors for your group.</div>
            </div>
            {moveBoxDown(
                (<div class="row justify-content-md-center">
                    <div className="col-md-3"><RoundedButtonLink label={"Apply as a Student "} link={APPLY_STUDENT} newTab /></div>
                    <div className="col-md-3"> <RoundedButtonLink label={"Apply as a Mentor"} link={APPLY_MENTOR} /></div>
                </div>)
            )}
            
        </div>
    )
}