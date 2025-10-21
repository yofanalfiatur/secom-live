"use client";
import React, { useState, useEffect } from "react";
import NewsFiltering from "./NewsFiltering";
import NewsContent from "./NewsContent";

export default function NewsLP({
  posts,
  locale,
  initialPage = 1,
  paginationInfo,
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  // Update filteredPosts when posts prop changes
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  // Sync currentPage with initialPage
  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

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
        />

        {/* Main Content */}
        <NewsContent
          filteredPosts={filteredPosts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          paginationInfo={paginationInfo}
          locale={locale}
        />
      </div>
    </section>
  );
}
