import { brandDocsUrl } from '@activepieces/shared';

export const adminDocs = {
  url: (path: string): string => brandDocsUrl(path),
};
