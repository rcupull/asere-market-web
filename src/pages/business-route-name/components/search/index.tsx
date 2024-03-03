import { UseFiltersReturn } from 'hooks/useFilters';

import { SearchFilter } from 'pages/@common/search-filter';
import { Business } from 'types/business';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface SearchProps extends StyleProps {
  filters: UseFiltersReturn;
  isBusy?: boolean;
  business: Business;
}

export const Search = ({ business, className, isBusy, filters }: SearchProps) => {
  const { layouts } = business;

  const currentLayouts = layouts?.search;

  if (currentLayouts?.type === 'none') {
    return <></>;
  }

  const renderContent = (content: React.ReactNode) => {
    return <div className={cn('mt-8 w-full', className)}>{content}</div>;
  };

  if (currentLayouts?.type === 'left') {
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

  if (currentLayouts?.type === 'center') {
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

  if (currentLayouts?.type === 'right') {
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

  return <></>;
};
