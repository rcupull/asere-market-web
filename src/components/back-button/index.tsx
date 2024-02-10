import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import {  useNavigate } from 'react-router-dom';

import { IconButton } from 'components/icon-button';

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate(-1)} svg={ArrowLeftIcon} className='ring-0'/>
  );
};
