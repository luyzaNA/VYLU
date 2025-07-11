import React from 'react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4"
            onClick={onClose}
        >
            <div
                className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-end p-2">
                    <button
                        onClick={onClose}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414
                   1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10
                   11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586
                   10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                <div className="p-6 pt-0 text-center">
                    <svg
                        className="w-20 h-20 text-red-600 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">{message}</h3>
                    <button
                        onClick={onConfirm}
                        className="text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-4 border-none"
                    >
                        Yes, I'm sure
                    </button>

                    <button
                        onClick={onClose}
                        className="text-gray-900 bg-gray-100 hover:bg-gray-400 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center border-none"
                    >
                        No, cancel
                    </button>

                </div>
            </div>
        </div>
    );
}
