
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Users,
  Star,
  Heart,
  Target,
  Eye,
} from "lucide-react";

const About = () => {
  return (
    <div className="about-page">

      <section className="page-banner">
        <div className="container">
          <span className="section-eyebrow">ABOUT VENUZA</span>
          <h1>Making Every Moment Memorable</h1>
          <p>
            We connect people with extraordinary events
            and unforgettable experiences.
          </p>
        </div>
      </section>

      <section className="about-intro container">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
            alt="People enjoying a live event"
          />
        </div>

        <div className="about-text">
          <span className="section-eyebrow">OUR STORY</span>

          <h2>Experience More With Venuza</h2>

          <p>
            Venuza is an event discovery and booking platform
            designed to make finding and attending events simple.
          </p>

          <p>
            Whether you enjoy concerts, business conferences,
            workshops, sports or cultural celebrations, our goal
            is to help you discover experiences that matter.
          </p>

          <p>
            We bring event organizers and attendees together
            through a convenient and user-friendly platform.
          </p>

          <Link to="/events" className="btn btn-primary">
            Explore Events
          </Link>
        </div>
      </section>

      <section className="about-stats">
        <div className="container about-stats-grid">
          <div>
            <CalendarDays size={30} />
            <h3>Discover</h3>
            <p>Explore different event experiences.</p>
          </div>

          <div>
            <Users size={30} />
            <h3>Connect</h3>
            <p>Bring communities and people together.</p>
          </div>

          <div>
            <Star size={30} />
            <h3>Experience</h3>
            <p>Create memories through special moments.</p>
          </div>

          <div>
            <Heart size={30} />
            <h3>Enjoy</h3>
            <p>Make every event worth remembering.</p>
          </div>
        </div>
      </section>

      <section className="about-mission container">
        <div className="mission-card">
          <Target size={34} />

          <h2>Our Mission</h2>

          <p>
            To simplify event discovery and booking while
            connecting people with experiences they love.
          </p>
        </div>

        <div className="mission-card">
          <Eye size={34} />

          <h2>Our Vision</h2>

          <p>
            To create a convenient event ecosystem where
            discovering and experiencing events is effortless.
          </p>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <span className="section-eyebrow">YOUR NEXT EXPERIENCE STARTS HERE</span>
          <h2>Ready to Discover Something Amazing?</h2>
          <p>Explore upcoming events and make your next moment special.</p>

          <Link to="/events" className="btn btn-primary">
            Discover Events
          </Link>
        </div>
      </section>

    </div>
  );
};

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
