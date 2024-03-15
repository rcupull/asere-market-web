import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';
import { StyleProps } from 'types/general';

export interface UpdatePageContainerProps extends StyleProps {
  children: React.ReactNode;
}

export const UpdatePageContainer = ({ children }: UpdatePageContainerProps) => {
  const { owner } = useBusinessPageData();

  if (!owner) {
    return <></>;
  }

  return <div className="absolute top-0 right-0">{children}</div>;
};
