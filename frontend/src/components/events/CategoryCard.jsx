import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const categoryName =
    typeof category === "string"
      ? category
      : category?.name || "Other";

  const categoryImage =
    typeof category === "object"
      ? category.image
      : "";

  const categoryIcon =
    typeof category === "object"
      ? category.icon
      : "🎉";

  return (
    <Link
      to={`/events?category=${encodeURIComponent(categoryName)}`}
      className="category-card"
    >
      {categoryImage ? (
        <img
          src={categoryImage}
          alt={categoryName}
        />
      ) : (
        <div className="category-icon">
          {categoryIcon}
        </div>
      )}

      <h3>{categoryName}</h3>
    </Link>
  );
};

export default CategoryCard;