import { X } from 'lucide-react';
import { toast } from 'sonner';

const showError = (message: string) => {
  toast.error(message, { icon: <X size={4} /> });
};

export default showError;
