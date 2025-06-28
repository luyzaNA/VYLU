import axiosInstance from '../api/axiosInstance';

export const getUserProfiles = async () => {
    const response = await axiosInstance.get('/profiles');
    return response.data;
};

export const getUserProfileById = async (profileId) => {
    const response = await axiosInstance.get(`/profile/${profileId}`);
    return response.data;
};

export const createUserProfile = async (formData) => {
    const payload = new FormData();

    payload.append('name', formData.fullName);
    payload.append('age', formData.age);

    if (formData.image) {
        payload.append('profilePicture', formData.image);
    }

    const measurements = {
        heightCm: formData.heightCm,
        chestCm: formData.chestCm,
        waistCm: formData.waistCm,
        hipsCm: formData.hipsCm,
        shoulderWidthCm: formData.shoulderWidthCm,
        armLengthCm: formData.armLengthCm,
        inseamCm: formData.inseamCm,
        thighCm: formData.thighCm,
        kneeCm: formData.kneeCm,
        calfCm: formData.calfCm,
        neckCm: formData.neckCm,
        torsoLengthCm: formData.torsoLengthCm,
    };

    Object.entries(measurements).forEach(([key, value]) => {
        payload.append(`bodyMeasurements[${key}]`, value);
    });

    const response = await axiosInstance.post('/profile', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
};



export const updateUserProfile = async (profileId, data) => {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }

    const response = await axiosInstance.put(`/profile/${profileId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const deleteUserProfile = async (profileId) => {
    const response = await axiosInstance.delete(`/profile/${profileId}`);
    return response.data;
};
