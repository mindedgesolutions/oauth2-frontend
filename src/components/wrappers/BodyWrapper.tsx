import { cn } from '@/lib/utils';

const BodyWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn('p-4', className)}>{children}</div>;
};
export default BodyWrapper;
