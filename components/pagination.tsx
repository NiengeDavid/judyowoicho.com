import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    // Always show first, last, current, and neighbors
    for (let i = 1; i <= totalPages; i++) {
      // Show first, last, current, and two neighbors
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (
        // Add ellipsis when skipping pages
        (i === currentPage - 2 && i > 2) ||
        (i === currentPage + 2 && i < totalPages - 1)
      ) {
        pages.push("...");
      }
    }
    // Remove duplicate ellipses
    return pages.filter(
      (page, idx, arr) => page !== "..." || arr[idx - 1] !== "..."
    );
  };

  const pages = getPageNumbers();

  return (
    <nav className={`flex items-center gap-1 mt-6 justify-start ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-primary hover:bg-secondary text-white px-2 py-1 rounded disabled:opacity-50 cursor-pointer"
        aria-label="Previous Page"
      >
        Previous
      </button>
      {pages.map((page, i) =>
        typeof page === "number" ? (
          <button
            key={i}
            onClick={() => onPageChange(page)}
            className={`px-2 py-1 rounded ${
              page === currentPage
                ? "bg-secondary cursor-pointer  text-white font-bold"
                : "bg-primary text-white hover:bg-secondary"
            }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={i} className="px-2 py-1">
            ...
          </span>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-primary hover:bg-secondary text-white px-2 py-1 rounded disabled:opacity-50 cursor-pointer"
        aria-label="Next Page"
      >
        Next&rarr;
      </button>
    </nav>
  );
}
