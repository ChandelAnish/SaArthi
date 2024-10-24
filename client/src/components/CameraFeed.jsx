import { useRef, useEffect, useState } from "react";

const CameraFeed = ({ text, setText }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streamError, setStreamError] = useState(false);
  const [detectedSign, setDetectedSign] = useState("");

  // Request access to the user's camera
  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
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
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // Function to capture frame and send it to the Flask server
  const captureFrame = async () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const imageData = canvasRef.current.toDataURL("image/jpeg");

      // Send the image to Flask server for processing
      try {
        const response = await fetch("http://127.0.0.1:5000/detect_sign", {
          method: "POST",
          body: JSON.stringify({ image: imageData }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        setDetectedSign(data.sign);
        console.log(data.sign);

        // Concatenate the incoming sign to the existing text
        if (data.sign) {
          setText((prevText) => prevText + data.sign);
        }
      } catch (error) {
        console.error("Error sending image to server: ", error);
      }
    }
  };

  // Capture frame every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      captureFrame();
    }, 1000); // Adjust the interval as needed

    return () => clearInterval(intervalId); // Cleanup the interval on unmount
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
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover transform scale-x-[-1]" // Added transform for mirroring
              />
              <canvas
                ref={canvasRef}
                width={640}
                height={480}
                style={{ display: "none" }}
              />
            </>
          )}
        </div>
        <p className="mt-4 text-center text-gray-800 dark:text-gray-300">
          Ensure your camera is allowed for this application.
        </p>
        {detectedSign && (
          <div className="mt-4 text-center text-xl text-gray-800 dark:text-gray-300">
            Detected Sign: {detectedSign}
          </div>
        )}
        {text && (
          <div className="mt-4 text-center text-xl text-gray-800 dark:text-gray-300">
            Message: {text}
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraFeed;
