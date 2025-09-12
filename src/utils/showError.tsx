import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';

const showError = (message: string) => {
  toast.error(message, {
    icon: <CircleAlert className="w-4 h-4 text-destructive" />,
  });
};

export default showError;
