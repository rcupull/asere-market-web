import { Link } from 'react-router-dom';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface SocialNetworkFaceProps extends StyleProps {
  to: string;
}

export const SocialNetworkFace = ({ to, className }: SocialNetworkFaceProps) => {
  return (
    <Link
      to={to}
      className={cn("m-1 h-9 w-9 rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0", className)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto h-full w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    </Link>
  );
};
