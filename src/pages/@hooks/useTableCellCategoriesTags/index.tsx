import { useMemo } from 'react';

import { Business } from 'types/business';

export const useTableCellCategoriesTags = ({
  business,
}: {
  business: Business;
}): {
  onGetTableCellNode: (args: { postCategoriesTags?: Array<string> }) => React.ReactNode;
} => {
  const { postCategories } = business;

  const tagsRecord = useMemo<Record<string, string>>(
    () =>
      (postCategories || []).reduce(
        (acc, { tag, label }) => ({
          ...acc,
          [tag]: label,
        }),
        {},
      ),
    [JSON.stringify(postCategories)],
  );

  return {
    onGetTableCellNode: ({ postCategoriesTags }) => {
      return (
        <div key="categories" className="flex flex-col gap-1">
          {postCategoriesTags?.map((tag, index) => (
            <span
              key={index}
              className="text-nowrap border border-gray-500 rounded-md px-1 text-center w-fit"
            >
              {tagsRecord[tag]}
            </span>
          ))}
        </div>
      );
    },
  };
};
