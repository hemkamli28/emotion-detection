import React, { useRef, useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import { FiCamera } from "react-icons/fi";
import { FiCameraOff } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import Loader from '../Components/Loader';

const ResultItem = ({ timestamp, message }) => (
    <div className='text-sm text-green-500'>
        [{timestamp}] - {message}
    </div>
);

const Dashboard = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [stream, setStream] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [logData, setLogData] = useState([]);
    const [outputData, setOutputData] = useState(null);
    const label = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise'];

    const startVideoStream = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setStream(stream);
                    logData.push({ timestamp: new Date().toLocaleString(), message: 'Camera Connection Successful' });
                }
            })
            .catch(error => console.error('Error accessing the camera:', error));
    };

    const toggleCamera = () => {
        if (isCameraOn) {
            stopVideoStream();
        } else {
            startVideoStream();
        }
        setIsCameraOn(!isCameraOn);
    };

    const stopVideoStream = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            logData.push({ timestamp: new Date().toLocaleString(), message: 'Camera Connection Closed' });
        }
    };

    const takePhoto = async () => {

        if (videoRef.current) {
            setLoading(true);
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL('image/png');

            try {
                const response = await fetch('http://localhost:8000/api/model/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ image: dataURL ,user_id:localStorage.getItem("id")})
                });

                const responseData = await response.json();
                console.log(responseData);
            //     const normalizedData = responseData.prediction[0].map(value => value < 0 ? 0 : (value > 1 ? 1 : value));
            // setOutputData({ ...response.data, prediction: [normalizedData] });
                setOutputData(responseData); // Store the response data in state
            } catch (err) {
                console.error('Error sending photo:', err);
            }
            setLoading(false)
        }
    };

    const fetchData = async () => {
        try {
            const id = localStorage.getItem("id");
            const response = await fetch(`http://localhost:8000/api/profile/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log(data);
            setData(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.replace('/login');
        }
        fetchData();
        startVideoStream();

        return () => {
            stopVideoStream();
        };
    }, []);

    return (
        <div className='bg-[#1a1a1a] w-full text-white flex min-h-screen'>
            <Sidebar />
            <Toaster />
            <div className='w-full ml-16'>
                <nav className='w-full flex items-center justify-between bg-[#242424]'>
                    <h1 className='p-4 px-8 text-lg'>{data?.username}</h1>
                </nav>
                <div className="md:flex md:flex-row">
                    <div className='w-[55%] px-4'>
                        <div className='pl-4 relative' style={{ width: '640px', height: '360px' }}>
                            <video ref={videoRef} autoPlay muted className="w-full h-full" style={{ borderRadius: '16px' }}></video>
                            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                            <button className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 p-4 text-white border border-white ${isCameraOn ? "" : "bg-red-500"} rounded-full mb-2`} onClick={toggleCamera}>
                                {isCameraOn ? <FiCamera /> : <FiCameraOff />}
                            </button>
                        </div>
                        <div className='flex justify-center items-center w-full'>
                        <button className="mt-4 p-2 px-8 bg-none border border-white text-white rounded-md" onClick={takePhoto}>Check Emotion</button>
                        </div>
                        <div>
                        {loading?<div className='mx-12 p-8 mt-8 rounded-md  bg-[#2F2F2F]'><Loader /></div>:outputData && (
                                    <div className='mx-12 p-8 mt-8 rounded-md  bg-[#2F2F2F]'>
                                        <div className='flex'>
                                        <h2>Emotions Detected:</h2>
                                        <p className='ml-2'>
                                           {outputData?.emotion}
                                        </p>
                                        </div><br></br>
                                        <p className='grid grid-cols-4'>{
                                                outputData?.prediction[0]?.map((item,index)=>(
                                                    <><span className='py-2'>{label[index]}: {(item.toFixed(2)*100).toFixed(2)}%</span><br></br></>

                                                ))
                                            }
                                        </p>

                                    </div>
                                )}
                        </div>
                    </div>
                    <div className='w-[45%] p-4'>
                        <div className='backdrop-blur-xl bg-white bg-opacity-10 rounded-xl max-h-[60vh] overflow-auto'>
                            <h1 className='text-center items-center p-4 uppercase text-xl fixed mx-4'>Log</h1>                             
                            <div className='text-sm pl-6 pb-12 pt-12'>
                                {logData?.map((log, index) => (
                                    <ResultItem key={index} timestamp={log.timestamp} message={log.message} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
