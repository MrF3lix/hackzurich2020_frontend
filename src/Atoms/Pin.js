import React from 'react';
import '../Content/Styles/animation.scss';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
    cursor: 'pointer',
    stroke: 'none',
};


export const Pin = ({ size, onClick, ...rest }) => (
    <svg
        height={size}
        viewBox="0 0 24 24"
        style={{ ...pinStyle, transform: `translate(${-size / 2}px,${-size}px)` }}
        onClick={onClick}
        {...rest}
    >
        <path d={ICON} />
    </svg>
);

export const TruckLocationPin = ({ size = 40, isLive = true, direction = 0, ...rest }) => {

    return (
        <svg transform={`rotate(${direction - 45})`} width={size} height={size} {...rest} viewBox="0 0 328 328" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle id={isLive && 'tracking-pin__animation'} cx="164" cy="164" r="164" fill="#3E38F2" fillOpacity="0.2" />
            <circle cx="164" cy="164" r="100" fill="white" />
            <circle cx="162.5" cy="162.5" r="87.5" fill="#230A59" />
            <path d="M212.463 119.737L166.106 212.464C165.285 214.155 163.909 215 161.977 215C161.736 215 161.374 214.952 160.891 214.855C159.829 214.614 158.972 214.07 158.32 213.225C157.668 212.38 157.342 211.426 157.342 210.364V168.636H115.62C114.558 168.636 113.604 168.31 112.759 167.658C111.914 167.006 111.371 166.149 111.129 165.087C110.888 164.024 110.984 163.01 111.419 162.044C111.854 161.078 112.554 160.354 113.52 159.871L206.234 113.507C206.862 113.169 207.562 113 208.335 113C209.639 113 210.725 113.459 211.594 114.376C212.319 115.053 212.765 115.886 212.934 116.876C213.103 117.866 212.946 118.82 212.463 119.737Z" fill="white" />
        </svg>
    );
};

export const ConstructionSitePin = ({ size = 40, ...rest }) => (
    <svg width={size} height={size} {...rest} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="100" fill="white" />
        <circle cx="100.5" cy="100.5" r="87.5" fill="#0AA620" />
        <circle cx="101" cy="100" r="36.5" stroke="white" strokeWidth="5" />
        <path d="M100.5 38L100.113 161" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <path d="M39 100H162" stroke="white" strokeWidth="5" strokeLinecap="round" />
    </svg>
);

export const CementFactoryPin = ({ size = 40, ...rest }) => (
    <svg width={size} height={size} {...rest} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="100" fill="white" />
        <circle cx="100.5" cy="100.5" r="87.5" fill="#DE8122" />
    </svg>
);