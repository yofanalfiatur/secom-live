"use client";
import React, { useState, useEffect } from "react";
import { getCategories } from "@/libs/api";

export default function NewsFiltering({
  posts,
  filteredPosts,
  setFilteredPosts,
  setCurrentPage,
  locale,
  currentCategory = "",
  currentYear = "",
  onCategoryChange,
  onYearChange,
  onClearAllFilters,
  availableYears = [],
}) {
  const [clickedFilter, setClickedFilter] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getCategories();
        const categoriesData = response?.data?.[locale] || response?.data?.en || [];
        
        // Transform categories to match expected format
        const transformedCategories = categoriesData.map((cat) => ({
          id: cat.id,
          name: cat.name || "",
          slug: cat.id.toString(), // Use ID as slug since API expects category ID
        }));
        
        setCategories(transformedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback to extracting categories from posts
        const uniqueCategories = [...new Set(posts.map((post) => post.category))];
        setCategories(uniqueCategories.map((cat, index) => ({
          id: index,
          name: cat,
          slug: cat.toLowerCase().replace(/\s+/g, '-'),
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [locale, posts]);

  // Filter functions
  const handleArchiveFilter = (year) => {
    if (onYearChange) {
      onYearChange(year);
    } else {
      // Fallback to client-side filtering
      const filtered = posts.filter((post) => {
        const postYear = new Date(post.publishedDate).getFullYear();
        return postYear === year;
      });
      setFilteredPosts(filtered);
      setCurrentPage(1);
    }
    setClickedFilter(null);
  };

  const handleCategoryFilter = (categorySlug) => {
    if (onCategoryChange) {
      onCategoryChange(categorySlug);
    } else {
      // Fallback to client-side filtering
      const filtered = posts.filter((post) => {
        const category = categories.find(cat => cat.slug === categorySlug);
        return category && post.category === category.name;
      });
      setFilteredPosts(filtered);
      setCurrentPage(1);
    }
    setClickedFilter(null);
  };

  const handleClearFilters = () => {
    // Use the dedicated clear all filters function if available
    if (onClearAllFilters) {
      onClearAllFilters();
    } else {
      // Fallback: Clear both category and year filters by directly manipulating URL
      if (onCategoryChange || onYearChange) {
        const params = new URLSearchParams(window.location.search);
        params.delete("category");
        params.delete("year");
        params.delete("page");
        
        const queryString = params.toString();
        const newUrl = queryString ? `?${queryString}` : window.location.pathname;
        
        // Use router from parent component or fallback to window navigation
        if (typeof window !== 'undefined') {
          window.history.pushState({}, '', newUrl);
          window.location.reload();
        }
      } else {
        // Fallback to client-side filtering
        setFilteredPosts(posts);
      }
    }
    setClickedFilter(null);
  };

  // Get unique years for archive filter - use availableYears from API if available
  const uniqueYears = availableYears.length > 0 
    ? availableYears.sort((a, b) => b - a)
    : [...new Set(posts.map((post) => new Date(post.publishedDate).getFullYear()))].sort((a, b) => b - a);

  return (
    <div className="w-full h-max lg:w-3/12 flex flex-col relative lg:sticky lg:top-[80px] lg:pr-10 lg:pt-10 pb-10 lg:pb-20 self-start">
      <p className="text-darkblue text-[30px] lg:text-[40px] font-raleway font-normal leading-[1] pb-4 lg:pb-6">
        {locale === "en" ? "Articles" : "Artikel"}
      </p>
      <div className="flex flex-col gap-y-3 lg:gap-y-4 news-lp__filter">
        {/* Archive Filter */}
        <div
          className={`flex flex-col relative news-lp__years ${
            clickedFilter === "archive" ? "z-[3]" : "z-0"
          }`}
        >
          <button
            name=""
            id=""
            className="text-navyblue relative z-0 uppercase tracking-[3px] font-raleway text-xs lg:text-base rounded-[5px] px-4 py-[16px] appearance-none w-full border-[1px] border-[#00000033] text-start cursor-pointer news-lp__years"
            onClick={() =>
              setClickedFilter(clickedFilter === "archive" ? null : "archive")
            }
          >
            {currentYear ? currentYear : (locale === "en" ? "Archive" : "Arsip")}
          </button>
          <svg
            width="22"
            height="15"
            viewBox="0 0 22 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`absolute z-0 right-4 top-1/2 transform -translate-y-1/2 pointer-events-none transition-all duration-300 ease scale-60 lg:scale-100 ${
              clickedFilter === "archive" ? "rotate-0" : "rotate-180"
            }`}
          >
            <path
              d="M21.3765 12.0804L10.9045 0L0.432595 12.0804C0.148111 12.4096 -0.00740039 12.8514 0.000270989 13.3085C0.00794236 13.7656 0.178168 14.2005 0.473501 14.5177C0.768834 14.8349 1.16508 15.0083 1.57507 14.9997C1.98507 14.9911 2.37522 14.8014 2.6597 14.4721L10.9045 4.95578L19.1585 14.4721C19.443 14.8014 19.8331 14.9911 20.2431 14.9997C20.6531 15.0083 21.0493 14.8349 21.3447 14.5177C21.64 14.2005 21.8102 13.7656 21.8179 13.3085C21.8256 12.8514 21.6701 12.4096 21.3856 12.0804H21.3765Z"
              fill="#00AAAD"
            />
          </svg>

          <ul
            className={`flex flex-col absolute z-[2] transform top-full left-0 bg-white w-full h-auto border-[1px] border-[#00000033] rounded-[5px] cursor-pointer ease-[cubic-bezier(.2,1,.3,1)] duration-300 transition-all ${
              clickedFilter === "archive"
                ? "max-h-[2000px] opacity-100 visible"
                : "max-h-0 opacity-0 invisible"
            }`}
          >
            {uniqueYears.map((year, index) => (
              <li
                key={index}
                className="text-darkblue py-2 px-2 hover:bg-gray-100"
                onClick={() => handleArchiveFilter(year)}
              >
                {year}
              </li>
            ))}
          </ul>
        </div>

        {/* Category Filter */}
        <div
          className={`flex flex-col relative news-lp__category ${
            clickedFilter === "category" ? "z-[3]" : "z-0"
          }`}
        >
          <button
            name=""
            id=""
            className="text-navyblue relative z-0 uppercase tracking-[3px] font-raleway text-xs lg:text-base rounded-[5px] px-4 py-[16px] appearance-none w-full border-[1px] border-[#00000033] text-start cursor-pointer news-lp__years"
            onClick={() =>
              setClickedFilter(clickedFilter === "category" ? null : "category")
            }
          >
            {currentCategory ? 
              (categories.find(cat => cat.slug === currentCategory)?.name || currentCategory) :
              (locale === "en" ? "Category" : "Kategori")
            }
          </button>
          <svg
            width="22"
            height="15"
            viewBox="0 0 22 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`absolute z-0 right-4 top-1/2 transform -translate-y-1/2 pointer-events-none transition-all duration-300 ease scale-60 lg:scale-100 ${
              clickedFilter === "category" ? "rotate-0" : "rotate-180"
            }`}
          >
            <path
              d="M21.3765 12.0804L10.9045 0L0.432595 12.0804C0.148111 12.4096 -0.00740039 12.8514 0.000270989 13.3085C0.00794236 13.7656 0.178168 14.2005 0.473501 14.5177C0.768834 14.8349 1.16508 15.0083 1.57507 14.9997C1.98507 14.9911 2.37522 14.8014 2.6597 14.4721L10.9045 4.95578L19.1585 14.4721C19.443 14.8014 19.8331 14.9911 20.2431 14.9997C20.6531 15.0083 21.0493 14.8349 21.3447 14.5177C21.64 14.2005 21.8102 13.7656 21.8179 13.3085C21.8256 12.8514 21.6701 12.4096 21.3856 12.0804H21.3765Z"
              fill="#00AAAD"
            />
          </svg>

          <ul
            className={`flex flex-col absolute z-[2] transform top-full left-0 bg-white w-full h-auto border-[1px] border-[#00000033] rounded-[5px] cursor-pointer ease-[cubic-bezier(.2,1,.3,1)] duration-300 transition-all ${
              clickedFilter === "category"
                ? "max-h-[2000px] opacity-100 visible"
                : "max-h-0 opacity-0 invisible"
            }`}
          >
            {loading ? (
              <li className="text-darkblue py-2 px-2">
                {locale === "en" ? "Loading..." : "Memuat..."}
              </li>
            ) : (
              <>
                {/* All Categories Option */}
                <li
                  className={`text-darkblue py-2 px-2 hover:bg-gray-100 ${
                    !currentCategory ? "bg-gray-100 font-semibold" : ""
                  }`}
                  onClick={() => handleCategoryFilter("")}
                >
                  {locale === "en" ? "All Categories" : "Semua Kategori"}
                </li>
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className={`text-darkblue py-2 px-2 hover:bg-gray-100 ${
                      currentCategory === category.slug ? "bg-gray-100 font-semibold" : ""
                    }`}
                    onClick={() => handleCategoryFilter(category.slug)}
                  >
                    {category.name}
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>

        {/* Clear Filters Button */}
        {(currentCategory || currentYear || filteredPosts.length !== posts.length) && (
          <button
            onClick={handleClearFilters}
            className="text-navyblue uppercase tracking-[3px] font-raleway text-xs lg:text-base rounded-[5px] px-4 py-[16px] border-[1px] border-[#00000033] text-start cursor-pointer hover:bg-gray-100"
          >
            {locale === "en" ? "Clear Filters" : "Hapus Filter"}
          </button>
        )}
      </div>
    </div>
  );
}
