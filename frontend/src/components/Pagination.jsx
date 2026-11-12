
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Pagination.css";

function Pagination({
    currentPage,
    totalPages,
    onPageChange
}) {
    if (totalPages <= 1) return null;

    const getPages = () => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="pagination-container">

            <button
                type="button"
                className="pagination-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <ChevronLeft size={18} />
            </button>

            {getPages().map((page) => (
                <button
                    type="button"
                    key={page}
                    className={`pagination-btn ${
                        currentPage === page ? "active" : ""
                    }`}
                    onClick={() => onPageChange(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                className="pagination-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <ChevronRight size={18} />
            </button>

        </div>
    );
}

export default Pagination;
