
import React from "react";
import { Link } from "react-router-dom";
import {
    Music,
    Heart,
    Laptop,
    Trophy,
    GraduationCap,
    Briefcase,
    PartyPopper,
    Utensils,
    ArrowRight
} from "lucide-react";

import "./CategoryCard.css";

const categoryIcons = {
    Music: Music,
    Wedding: Heart,
    Technology: Laptop,
    Sports: Trophy,
    Education: GraduationCap,
    Business: Briefcase,
    Entertainment: PartyPopper,
    Food: Utensils
};

function CategoryCard({ category }) {
    if (!category) return null;

    const Icon = categoryIcons[category.name] || PartyPopper;

    return (
        <Link
            to={`/events?category=${encodeURIComponent(category.name)}`}
            className="category-card"
        >
            <div className="category-card-icon">
                <Icon size={30} />
            </div>

            <div className="category-card-info">
                <h3>{category.name}</h3>

                <p>
                    {category.count ?? 0} Events
                </p>
            </div>

            <ArrowRight
                className="category-card-arrow"
                size={20}
            />
        </Link>
    );
}

export default CategoryCard;
