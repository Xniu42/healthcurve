// components/EditModal.tsx
'use client';

import * as Dialog from '@radix-ui/react-dialog';
import EditForm from './EditForm';

interface EditModalProps {
  metric: {
    id: string;
    created_at: string;
    metric_type: string;
    metric_value: number;
    metric_date: string;
    user_id: string;
  };
  open: boolean;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ metric, open, onClose }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-lg w-[90vw] rounded-lg p-6 bg-white -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-xl font-bold mb-4">Edit Metric</Dialog.Title>
          <EditForm metric={metric} onClose={onClose} />
          <Dialog.Close asChild>
            <button className="absolute top-4 right-4">Close</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditModal;