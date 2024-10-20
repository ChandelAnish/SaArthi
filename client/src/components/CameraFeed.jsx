import { useRef, useEffect, useState } from 'react';

const CameraFeed = () => {
    const videoRef = useRef(null);
    const [streamError, setStreamError] = useState(false);

    // Request access to the user's camera
    useEffect(() => {
        const getCameraStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                setStreamError(true);
                console.error("Error accessing camera: ", err);
            }
        };
        getCameraStream();

        // Cleanup: stop video stream when the component is unmounted
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-4xl">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
                    Camera Feed
                </h1>
                <div className="relative w-full h-96 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    {streamError ? (
                        <div className="flex items-center justify-center h-full text-red-500">
                            Failed to access camera
                        </div>
                    ) : (
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="absolute top-0 left-0 w-full h-full object-cover transform scale-x-[-1]" // Added transform for mirroring
                        />
                    )}
                </div>
                <p className="mt-4 text-center text-gray-800 dark:text-gray-300">
                    Ensure your camera is allowed for this application.
                </p>
            </div>
        </div>
    );
};

export default CameraFeed;
