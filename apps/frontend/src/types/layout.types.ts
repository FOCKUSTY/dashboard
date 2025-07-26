export type PageProps<T> = {
  params: T;
  searchParams: Record<string, string | string[] | undefined>;
};

export type LayoutProps<T> = {
  params: T,
  children: React.ReactNode
};