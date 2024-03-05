import { UseFiltersReturn } from 'hooks/useFilters';

import { PostCategoriesFilterButtons } from 'pages/@common/filters/post-categories-filter-buttons';
import { SearchFilter } from 'pages/@common/filters/search-filter';
import { Business } from 'types/business';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface SearchProps extends StyleProps {
  filters: UseFiltersReturn;
  isBusy?: boolean;
  business: Business;
}

export const Search = ({ business, className, isBusy, filters }: SearchProps) => {
  const { layouts, postCategories } = business;

  const visiblesPostCategories = postCategories?.filter(({ hidden }) => !hidden);
  const type = layouts?.search?.type;

  if (type === 'none') {
    return <></>;
  }

  const renderContent = (content: React.ReactNode) => {
    return <div className={cn('mt-8 w-full', className)}>{content}</div>;
  };

  if (type === 'left') {
    return renderContent(
      <div className="flex justify-start">
        <SearchFilter
          isBusy={isBusy}
          onChange={(search) => filters.onMergeFilters({ search })}
          value={filters.value.search}
        />
      </div>,
    );
  }

  if (type === 'center') {
    return renderContent(
      <div className="flex justify-center">
        <SearchFilter
          isBusy={isBusy}
          onChange={(search) => filters.onMergeFilters({ search })}
          value={filters.value.search}
        />
      </div>,
    );
  }

  if (type === 'right') {
    return renderContent(
      <div className="flex justify-end">
        <SearchFilter
          isBusy={isBusy}
          onChange={(search) => filters.onMergeFilters({ search })}
          value={filters.value.search}
        />
      </div>,
    );
  }

  if (type === 'postCategories') {
    return renderContent(
      <PostCategoriesFilterButtons
        postCategories={visiblesPostCategories}
        onChange={(postCategoriesTags) => filters.onMergeFilters({ postCategoriesTags })}
        value={filters.value.postCategoriesTags}
        className="flex-wrap"
      />,
    );
  }

  if (type === 'postCategoriesScrollable') {
    return renderContent(
      <PostCategoriesFilterButtons
        postCategories={visiblesPostCategories}
        onChange={(postCategoriesTags) => filters.onMergeFilters({ postCategoriesTags })}
        value={filters.value.postCategoriesTags}
        className="overflow-x-auto max-w-full"
      />,
    );
  }

  if (type === 'postCategoriesExcluded') {
    return renderContent(
      <PostCategoriesFilterButtons
        postCategories={visiblesPostCategories}
        onChange={(postCategoriesTags) => filters.onMergeFilters({ postCategoriesTags })}
        value={filters.value.postCategoriesTags}
        excluding
        className="flex-wrap"
      />,
    );
  }

  if (type === 'postCategoriesExcludedScrollable') {
    return renderContent(
      <PostCategoriesFilterButtons
        postCategories={visiblesPostCategories}
        onChange={(postCategoriesTags) => filters.onMergeFilters({ postCategoriesTags })}
        value={filters.value.postCategoriesTags}
        excluding
        className="overflow-x-auto max-w-full"
      />,
    );
  }

  return <></>;
};
