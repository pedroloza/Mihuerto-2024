import React, { FC } from 'react'

const LoadingModal: FC = () => {
    return (
        <div style={{ position: 'absolute', width: "100vw", height: "100vh", zIndex: 9999, background: 'white', top: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span className="loading-loader"></span>
        </div>
    )
}

export default LoadingModal