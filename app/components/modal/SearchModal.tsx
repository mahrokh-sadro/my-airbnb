"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import React from "react";
import Modal from "./modal";

interface SearchModalProps {
  // isOpen: boolean;
  // onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = () => {
  const searchModal = useSearchModal();

  return (
    <Modal
      // disabled={isLoading}
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={searchModal.onOpen}
      title="Filters"
      // body={bodyContent}
      actionLabel={"Search"}
      // footer={footerContent}
    />
  );
};

export default SearchModal;
