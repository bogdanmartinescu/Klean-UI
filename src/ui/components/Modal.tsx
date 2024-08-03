import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import clsx from "clsx";

interface ModalProps extends RadixDialog.DialogProps {
  title: string;
  className: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  className,
  ...props
}) => {
  return (
    <RadixDialog.Root {...props}>
      <RadixDialog.Trigger asChild>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Open Modal
        </button>
      </RadixDialog.Trigger>
      <RadixDialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
      <RadixDialog.Content
        className={clsx(
          "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg transition",
          className
        )}
      >
        <RadixDialog.Title className="text-xl font-semibold">
          {title}
        </RadixDialog.Title>
        {children}
        <RadixDialog.Close asChild>
          <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">
            Close
          </button>
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Root>
  );
};

export default Modal;
