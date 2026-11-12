
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

export default About;
