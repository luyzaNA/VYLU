import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { PlusIcon } from '@heroicons/react/24/solid';
import { getUserProfiles, deleteUserProfile } from '../services/profileService.js';
import ConfirmModal from '../components/ConfirmModal';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import {useNavigate} from "react-router-dom";

export default function PeopleList() {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [profileToDelete, setProfileToDelete] = useState({ id: null, name: '' });
    const [feedback, setFeedback] = useState({ type: '', message: '' });
    const navigate = useNavigate();

    const fetchProfiles = async () => {
        try {
            setLoading(true);
            const data = await getUserProfiles();
            setProfiles(data);
            setError(null);
        } catch (err) {
            setError('Failed to load profiles.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    const handleAddProfile = () => {
        navigate('/add-profile');
    };

    const handleDeleteClick = (profileId, profileName) => {
        setProfileToDelete({ id: profileId, name: profileName });
        setModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteUserProfile(profileToDelete.id);
            setFeedback({ type: 'success', message: `Profile ${profileToDelete.name} was deleted.` });
            setModalOpen(false);
            setProfileToDelete({ id: null, name: '' });
            await fetchProfiles();
        } catch (err) {
            setFeedback({ type: 'error', message: 'An error occurred while deleting the profile.' });
            console.error(err);
        }
    };

    useEffect(() => {
        if (feedback.message) {
            const timeout = setTimeout(() => {
                setFeedback({ type: '', message: '' });
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [feedback]);

    if (loading) return <div className="text-white">Loading...</div>;
    if (error) return <div className="text-red-400">{error}</div>;

    return (
        <>
            {profiles.length === 0 ? (
                <div className="relative w-full min-h-[calc(100vh-64px-48px)] flex flex-col items-center justify-center text-center px-4">
                    <img
                        src="https://thumb.r2.moele.me/t/34161/34151502/a-0076.jpg"
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-white opacity-80  z-10"></div>
                    <div className="relative z-10 max-w-xl bg-white bg-opacity-80 rounded-lg p-8 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">No Profiles Found</h2>
                        <p className="mb-6 text-gray-600">
                            You don't have any profiles yet. Click below to add your first profile!
                        </p>
                        <button
                            onClick={handleAddProfile}
                            className="inline-flex items-center px-6 py-3 bg-[#1F3134] text-white rounded-lg hover:bg-[#2b4548] transition border-none"
                        >
                            <PlusIcon className="w-6 h-6 mr-2" />
                            Add New Profile
                        </button>
                    </div>
                </div>
            ) : (
                <div className="relative w-full min-h-[calc(100vh-64px-48px)] flex flex-col items-center justify-center">
                    <img
                        src="https://thumb.r2.moele.me/t/34161/34151502/a-0076.jpg"
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="Background"
                    />
                    <div className="absolute inset-0 py-4 bg-white opacity-50"></div>
                    <div className="relative z-10 w-full flex flex-col items-center py-8">
                        <div className="flex flex-wrap gap-6 justify-center w-full max-w-7xl mx-auto px-4">
                            {profiles.map(profile => (
                                <ProfileCard
                                    key={profile._id}
                                    person={profile}
                                    onDelete={handleDeleteClick}
                                    onEdit={() => navigate(`/edit-profile/${profile._id}`)}
                                />
                            ))}
                            <div
                                onClick={handleAddProfile}
                                className="w-[280px] h-[360px] bg-[#1F3134] rounded-lg shadow-lg hover:shadow-[#89B6D0] hover:border-white transform  transition-transform  duration-500 p-12 flex flex-col justify-center items-center cursor-pointer text-white hover:scale-105"                            >
                                <PlusIcon className="w-16 h-16 mb-4" />
                                <div className="text-xl font-semibold">Add New Profile</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {feedback.message && (
                <div className="absolute top-4 w-full max-w-2xl px-4 z-50">
                    <Collapse in={!!feedback.message}>
                        <Alert
                            severity={feedback.type}
                            onClose={() => setFeedback({ type: '', message: '' })}
                        >
                            {feedback.message}
                        </Alert>
                    </Collapse>
                </div>
            )}
            <ConfirmModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirmDelete}
                message={`Are you sure you want to delete the profile for ${profileToDelete.name}?`}
            />
        </>
    );
}
