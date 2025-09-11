import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const showSuccess = (message: string) => {
  toast.success(message, { icon: <CheckCircle size={4} /> });
};

export default showSuccess;
