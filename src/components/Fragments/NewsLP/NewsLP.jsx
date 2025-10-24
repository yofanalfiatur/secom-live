"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NewsFiltering from "./NewsFiltering";
import NewsContent from "./NewsContent";

export default function NewsLP({
  posts,
  locale,
  initialPage = 1,
  paginationInfo,
  selectedCategory = "",
  availableYears = [],
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [currentCategory, setCurrentCategory] = useState(selectedCategory);

  // Update filteredPosts when posts prop changes
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  // Sync currentPage with initialPage
  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  // Sync currentCategory with selectedCategory
  useEffect(() => {
    setCurrentCategory(selectedCategory);
  }, [selectedCategory]);

  // Handle category filter change
  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams);
    
    if (category && category !== "") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    
    // Reset to page 1 when filtering
    params.delete("page");
    
    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    router.push(newUrl);
  };

  // Handle year filter change
  const handleYearChange = (year) => {
    const params = new URLSearchParams(searchParams);
    
    if (year && year !== "") {
      params.set("year", year);
    } else {
      params.delete("year");
    }
    
    // Reset to page 1 when filtering
    params.delete("page");
    
    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    router.push(newUrl);
  };

  // Handle page change
  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    
    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    
    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    
    router.push(newUrl);
  };

  return (
    <section className="flex flex-col relative pt-10 lg:pt-0 overflow-x-hidden lg:!overflow-x-visible w-full news-lp">
      <div className="container mx-auto flex flex-col lg:flex-row relative">
        {/* Sidebar Filter */}
        <NewsFiltering
          posts={posts}
          filteredPosts={filteredPosts}
          setFilteredPosts={setFilteredPosts}
          setCurrentPage={setCurrentPage}
          locale={locale}
          currentCategory={currentCategory}
          onCategoryChange={handleCategoryChange}
          onYearChange={handleYearChange}
          availableYears={availableYears}
        />

        {/* Main Content */}
        <NewsContent
          filteredPosts={filteredPosts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          paginationInfo={paginationInfo}
          locale={locale}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
