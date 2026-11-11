
import React from "react";
import "./About.css";

function About() {
    return (
        <div className="about-container">

            {/* About Hero Section */}
            <section className="about-hero">
                <h1>About EventHub</h1>
                <p>
                    Discover, explore, and book amazing events
                    from different organizers on one platform.
                </p>
            </section>

            {/* Our Story */}
            <section className="about-story">
                <h2>Who We Are</h2>
                <p>
                    EventHub is an online event discovery and booking
                    platform that connects people with event organizers.
                    Whether you are looking for concerts, weddings,
                    workshops, conferences, or entertainment events,
                    EventHub makes finding and booking events easier.
                </p>
            </section>

            {/* Mission and Vision */}
            <section className="mission-vision">
                <div className="about-card">
                    <h2>Our Mission</h2>
                    <p>
                        To make event discovery and booking simple,
                        convenient, and accessible for everyone.
                    </p>
                </div>

                <div className="about-card">
                    <h2>Our Vision</h2>
                    <p>
                        To build a platform where people can discover
                        events and organizers can reach their audience.
                    </p>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="why-us">
                <h2>Why Choose EventHub?</h2>

                <div className="why-container">
                    <div className="why-card">
                        <h3>Easy Event Discovery</h3>
                        <p>Find different events in one place.</p>
                    </div>

                    <div className="why-card">
                        <h3>Multiple Organizers</h3>
                        <p>Explore events from different organizers.</p>
                    </div>

                    <div className="why-card">
                        <h3>Simple Booking</h3>
                        <p>Book your favourite events easily.</p>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default About;
