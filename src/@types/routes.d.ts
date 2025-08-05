export interface IRoute {
  title?: string | React.Element | ReactNode;
  documentTitle?: string | React.Element | ReactNode;
  path: string;
  layout?: React.Component | FC | JSX.Element | null;
  page: JSX.Element | React.LazyExoticComponent<FC<{ any }>> | FC;
  logoutRequired?: boolean;
  params?: string;
}
