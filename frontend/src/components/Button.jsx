import React from 'react';

export default function PrimaryButton({ children, style = {}, ...props }) {
    const baseStyle = {
        backgroundColor: '#EE6C4D',
        color: 'white',
        transition: 'transform 0.2s',
        ...style,
    };

    const handleMouseEnter = e => e.currentTarget.style.transform = 'scale(1.02)';
    const handleMouseLeave = e => e.currentTarget.style.transform = 'scale(1)';

    return (
        <button
            className="w-full py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed "
            style={baseStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
        </button>
    );
}