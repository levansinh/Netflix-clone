import { resources } from '@/locales/configs';
import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface PageWrapperProps {
  children: React.ReactNode;
  title?: keyof typeof resources.en.common;
  documentTitle?: keyof typeof resources.en.common;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  title,
  documentTitle
}) => {
  const { t } = useTranslation('common');

  useEffect(() => {
    if (title) {
      document.title = t(title);
    } else if (documentTitle) {
      document.title = t(documentTitle);
    }
  }, [title, documentTitle, t]);

  return (
    <Suspense fallback={'Loading...'}>
      {title && <h1 className='mt-4 text-info'>{t(title)}</h1>}
      {children}
    </Suspense>
  );
};

export default PageWrapper;
