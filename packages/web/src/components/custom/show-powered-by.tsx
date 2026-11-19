import { brand } from '@activepieces/shared';

import { cn } from '@/lib/utils';

type ShowPoweredByProps = {
  show: boolean;
  position?: 'sticky' | 'absolute' | 'static';
};
const ShowPoweredBy = ({ show, position = 'sticky' }: ShowPoweredByProps) => {
  if (!show) {
    return null;
  }
  return (
    <div
      data-powered-by-branding="true"
      className={cn('bottom-0 right-3 pointer-events-none z-40', position, {
        'h-0 mr-5': position === 'sticky',
      })}
    >
      <div
        className={cn(
          'justify-end text-gray-11 text-sm items-center flex gap-1 transition group ',
          {
            '-translate-y-full': position === 'sticky',
            'justify-center': position === 'static',
          },
        )}
      >
        <div className="text-sm transition">Built with</div>
        <div className="justify-center flex items-center gap-1">
          <img src={brand.logos.logoIconUrl} alt="" className="size-4" />
          <div className="font-semibold">{brand.productName}</div>
        </div>
      </div>
    </div>
  );
};

ShowPoweredBy.displayName = 'ShowPoweredBy';
export { ShowPoweredBy };
