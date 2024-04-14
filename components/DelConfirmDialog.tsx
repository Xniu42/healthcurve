// hm/components/DelConfirmDialog.tsx
'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';

interface DelConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DelConfirmDialog: React.FC<DelConfirmDialogProps> = ({ open, onConfirm, onCancel }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onCancel}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg w-[90vw] max-w-md">
          <Dialog.Title className="text-lg font-semibold mb-4">确认删除</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mb-6">
            您确定要删除这条健康指标数据吗?此操作无法撤销。
          </Dialog.Description>
          <div className="flex justify-end space-x-2">
            <Dialog.Close asChild>
              <Button variant="outline" onClick={onCancel}>
                取消
              </Button>
            </Dialog.Close>
            <Button variant="destructive" onClick={onConfirm}>
              删除
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DelConfirmDialog;