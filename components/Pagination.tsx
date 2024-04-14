// hm/component/Pagination.tsx
import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`/metrics?page=${page}`}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {page}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;