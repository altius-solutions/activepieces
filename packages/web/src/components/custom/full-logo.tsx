import { t } from 'i18next';

import { useTheme } from '@/components/providers/theme-provider';
import { flagsHooks } from '@/hooks/flags-hooks';
import { cn } from '@/lib/utils';

const FullLogo = ({ className }: { className?: string }) => {
  const branding = flagsHooks.useWebsiteBranding();
  const { resolvedTheme } = useTheme();
  const lightLogoUrl = branding?.logos?.fullLogoUrl;
  const darkLogoUrl = branding?.logos?.fullLogoDarkUrl;
  const logoUrl =
    resolvedTheme === 'dark' ? darkLogoUrl ?? lightLogoUrl : lightLogoUrl;

  return (
    <div className={cn('h-[60px]', className)}>
      {logoUrl && (
        <img
          className="h-full w-auto max-w-full"
          src={logoUrl}
          alt={branding?.websiteName ?? t('logo')}
        />
      )}
    </div>
  );
};
FullLogo.displayName = 'FullLogo';
export { FullLogo };
