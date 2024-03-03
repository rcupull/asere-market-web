import hookSrc from './business-hook-logo-image.png';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface BusinessHookLogoProps extends StyleProps {}

export const BusinessHookLogo = ({ className }: BusinessHookLogoProps) => (
  <div className={cn('px-2 py-1 rounded-full bg-white h-8', className)}>
    <img className="h-full" src={hookSrc} alt="Hook Logo"  />
  </div>
)