import React from "react";
import { Modal, useModal } from "@geist-ui/core";

export interface ExerciseConfirmRemoveModalProps {
  visible: boolean;
  exerciseName: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const ExerciseConfirmRemoveModal: React.FC<
  ExerciseConfirmRemoveModalProps
> = ({ visible, exerciseName, onCancel, onConfirm }) => {
  const handleCancel = () => {
    onCancel?.();
  };

  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <Modal visible={visible} onClose={onCancel}>
      <Modal.Title>Confirm remove</Modal.Title>
      <Modal.Content>Are you sure to remove {exerciseName}?</Modal.Content>
      <Modal.Action passive onClick={handleCancel}>
        Cancel
      </Modal.Action>
      <Modal.Action passive onClick={handleConfirm}>
        Remove
      </Modal.Action>
    </Modal>
  );
};
