import { Button } from "../../components/ui/button";

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function RemoveConfirmModal({ open, onConfirm, onCancel }: Props) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-lg p-6 w-[350px] shadow-lg">

        <h2 className="text-lg font-bold mb-4">
          Remove Item
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to remove this item from your cart?
        </p>

        <div className="flex justify-end space-x-3">

          <Button
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={onConfirm}
          >
            Remove
          </Button>

        </div>

      </div>

    </div>
  );
}