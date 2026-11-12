
import { Link } from "react-router-dom";
import {
  Music,
  BriefcaseBusiness,
  Trophy,
  Palette,
  Utensils,
  GraduationCap,
  Camera,
  Heart,
} from "lucide-react";

const categories = [
  {
    name: "Music",
    description: "Concerts, live performances and music festivals.",
    icon: <Music size={35} />,
    count: "Live performances",
  },
  {
    name: "Business",
    description: "Conferences, networking and business events.",
    icon: <BriefcaseBusiness size={35} />,
    count: "Professional events",
  },
  {
    name: "Sports",
    description: "Sports competitions and exciting tournaments.",
    icon: <Trophy size={35} />,
    count: "Sports experiences",
  },
  {
    name: "Arts & Culture",
    description: "Art exhibitions and cultural celebrations.",
    icon: <Palette size={35} />,
    count: "Creative experiences",
  },
  {
    name: "Food",
    description: "Food festivals, culinary events and tastings.",
    icon: <Utensils size={35} />,
    count: "Food experiences",
  },
  {
    name: "Education",
    description: "Workshops, seminars and learning opportunities.",
    icon: <GraduationCap size={35} />,
    count: "Learning events",
  },
  {
    name: "Photography",
    description: "Photography exhibitions and creative meetups.",
    icon: <Camera size={35} />,
    count: "Creative meetups",
  },
  {
    name: "Lifestyle",
    description: "Community gatherings and lifestyle experiences.",
    icon: <Heart size={35} />,
    count: "Community events",
  },
];

const Categories = () => {
  return (
    <div className="categories-page">
      <section className="page-banner">
        <div className="container">
          <span className="section-eyebrow">EXPLORE YOUR INTERESTS</span>
          <h1>Discover Event Categories</h1>
          <p>
            From music and sports to business and culture,
            find experiences that inspire you.
          </p>
        </div>
      </section>

      <section className="categories-section container">
        <div className="section-heading">
          <span className="section-eyebrow">EXPLORE BY CATEGORY</span>
          <h2>Find What You Love</h2>
          <p>
            Choose your favourite category and explore upcoming events.
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/events?category=${encodeURIComponent(category.name)}`}
              className="category-card"
            >
              <div className="category-icon">
                {category.icon}
              </div>

              <span className="category-count">
                {category.count}
              </span>

              <h3>{category.name}</h3>

              <p>{category.description}</p>

              <span className="category-explore">
                Explore Events →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Categories;
