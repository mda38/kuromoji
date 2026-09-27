'use client';

import { Button } from '@/shared/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/dialog';

type Props = {
  sheet: { id: string; name: string } | null;
  onClose: () => void;
  onConfirm: (sheetId: string) => void;
};

export function SheetDeleteConfirmDialog({ sheet, onClose, onConfirm }: Props) {
  return (
    <Dialog open={sheet !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>シートを削除しますか？</DialogTitle>
          <DialogDescription>
            「{sheet?.name}」を削除します。この操作は元に戻せません。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button type="button" variant="destructive" onClick={() => sheet && onConfirm(sheet.id)}>
            削除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
