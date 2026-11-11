
import React from "react";
import "./Categories.css";

function Categories() {

    const categories = [
        {
            id: 1,
            name: "Music & Concerts",
            description: "Explore live music, concerts and DJ events.",
            icon: "🎵"
        },
        {
            id: 2,
            name: "Weddings",
            description: "Discover wedding celebrations and ceremonies.",
            icon: "💍"
        },
        {
            id: 3,
            name: "Technology",
            description: "Explore tech conferences, hackathons and meetups.",
            icon: "💻"
        },
        {
            id: 4,
            name: "Sports",
            description: "Find sports tournaments and fitness events.",
            icon: "🏆"
        },
        {
            id: 5,
            name: "Education",
            description: "Discover workshops, seminars and educational events.",
            icon: "📚"
        },
        {
            id: 6,
            name: "Business",
            description: "Connect through business meetings and networking.",
            icon: "💼"
        },
        {
            id: 7,
            name: "Entertainment",
            description: "Enjoy comedy shows, festivals and performances.",
            icon: "🎭"
        },
        {
            id: 8,
            name: "Food & Lifestyle",
            description: "Explore food festivals and lifestyle events.",
            icon: "🍽️"
        }
    ];

    return (
        <div className="categories-page">

            {/* Header */}
            <section className="categories-header">
                <h1>Explore Event Categories</h1>
                <p>
                    Discover events that match your interests.
                    Something exciting is waiting for you!
                </p>
            </section>

            {/* Categories */}
            <section className="categories-content">

                <div className="categories-grid">

                    {categories.map((category) => (
                        <div className="category-card" key={category.id}>

                            <div className="category-icon">
                                {category.icon}
                            </div>

                            <h2>{category.name}</h2>

                            <p>{category.description}</p>

                            <button
                                onClick={() => {
                                    window.location.href =
                                        `/events?category=${encodeURIComponent(category.name)}`;
                                }}
                            >
                                Explore Events
                            </button>

                        </div>
                    ))}

                </div>

            </section>

        </div>
    );
}

export default Categories;
