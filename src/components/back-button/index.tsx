import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <a onClick={() => navigate(-1)}>
      <ArrowLeftIcon className="h-6 w-6 text-gray-600 cursor-pointer font-bold" />
    </a>
  );
};
