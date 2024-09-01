"use client";
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import ContactForm from "../ContactForm";

const Modal = ({ onClose, productName }) => {
  const produto = productName;

  return (
    <Transition.Root show={true} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white px-12 py-8 rounded-lg overflow-hidden shadow-xl transition-all relative">
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-red-600">
                  Entre em Contato sobre {produto}
                </h2>
                {/* Aqui você pode adicionar mais elementos ao lado do título */}
              </div>

              <ContactForm productName={produto} />
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
