export interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
}