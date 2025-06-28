import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';

export default function ProfileCard({ person, onDelete, onEdit }) {
    return (
        <div className="w-[280px] h-[360px] bg-[#1F3134] rounded-lg shadow-lg hover:shadow-[#89B6D0] hover:border-white transform transition-transform duration-500 p-12 flex flex-col justify-center align-center text-white hover:scale-105">
            <div className="flex mb-6 items-center justify-center">
                <img
                    className="h-40 w-40 rounded-full object-cover"
                    src={person.profilePicture}
                    alt={`${person.name} profile`}
                />
            </div>
            <div className="text-lg font-semibold text-white text-center p-7">
                {person.name}
            </div>

            <div className="flex justify-center w-full gap-2">
                <button className="flex items-center gap-1 px-3 py-1 text-sm bg-[#89B6D0] text-[#1F3134] rounded border-none outline-none hover:outline-none hover:border-none"
                onClick={() => onEdit(person._id)}  >
                    <PencilIcon className="w-4 h-4 text-[#1F3134]"/>
                    Edit
                </button>
                <button
                    onClick={() => onDelete(person._id, person.name)}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-[#EE6C4D] text-white rounded border-none outline-none hover:outline-none hover:border-none"
                >
                    <TrashIcon className="w-4 h-4" />
                    Delete
                </button>
            </div>
        </div>
    );
}
