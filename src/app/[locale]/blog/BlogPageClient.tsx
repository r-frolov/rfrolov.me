"use client";

import { useMemo, useState } from "react";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";

import { BlogPostCard, BlogPostListItem, TagFilter } from "@/components/sections/Blog";
import { Container, EmptyState, SearchInput, SectionHeader, ViewToggle } from "@/components/ui";
import { type TViewMode } from "@/components/ui/ViewToggle";
import { FADE_IN, FADE_IN_TRANSITION } from "@/constants";
import { usePersistedState, useTactileSurface } from "@/hooks";
import { TBlogPostMeta } from "@/types";

type TProps = {
  posts: TBlogPostMeta[];
  tags: string[];
};

export function BlogPageClient({ posts, tags }: TProps) {
  const t = useTranslations("blog");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [view, setView] = usePersistedState<TViewMode>("blog-view-mode", "grid");
  const [searchQuery, setSearchQuery] = useState("");
  const isTactile = useTactileSurface("blog-filters");

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const filteredPosts = useMemo(() => {
    let result = posts;

    // OR matching: keep posts that carry at least one of the selected tags.
    if (selectedTags.length > 0) {
      const selected = selectedTags.map((tag) => tag.toLowerCase());
      result = result.filter((post) =>
        post.tags.some((tag) => selected.includes(tag.toLowerCase()))
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [posts, selectedTags, searchQuery]);

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery("");
  };

  const isFiltering = selectedTags.length > 0 || searchQuery.trim() !== "";
  const showFilterCount = isFiltering && filteredPosts.length !== posts.length;

  return (
    <section className="min-h-[calc(100vh-4rem)] py-12 lg:py-16">
      <Container>
        <m.div {...FADE_IN} transition={FADE_IN_TRANSITION} className="space-y-12">
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <SectionHeader as="h1" description={t("description")} title={t("title")} />
              <ViewToggle view={view} onViewChange={setView} />
            </div>

            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t("searchPlaceholder")}
              className="max-w-md"
            />

            {tags.length > 0 && (
              <div className="space-y-2">
                <TagFilter
                  tags={tags}
                  selectedTags={selectedTags}
                  onToggle={toggleTag}
                  onClear={() => setSelectedTags([])}
                  isTactile={isTactile}
                  labels={{
                    all: t("filters.all"),
                    showLess: t("filters.showLess"),
                    showMoreAria: (count) => t("filters.showMoreAria", { count }),
                    showLessAria: t("filters.showLessAria"),
                  }}
                />
                {showFilterCount && (
                  <span className="block text-xs text-muted-foreground">
                    {t("showingCount", { count: filteredPosts.length, total: posts.length })}
                  </span>
                )}
              </div>
            )}
          </div>

          {filteredPosts.length > 0 ? (
            view === "grid" ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredPosts.map((post, index) => (
                  <BlogPostCard key={post.slug} index={index} post={post} headingLevel={2} />
                ))}
              </div>
            ) : (
              <div className="divide-y divide-muted -my-4">
                {filteredPosts.map((post, index) => (
                  <BlogPostListItem key={post.slug} index={index} post={post} />
                ))}
              </div>
            )
          ) : (
            <EmptyState
              title={
                searchQuery ? t("noPostsForQuery", { query: searchQuery }) : t("noPostsFound")
              }
              description={searchQuery ? t("tryDifferentSearch") : t("tryDifferentFilter")}
              variant={searchQuery ? "search" : "filter"}
              action={{ label: t("clearFilters"), onClick: clearFilters }}
            />
          )}
        </m.div>
      </Container>
    </section>
  );
}
