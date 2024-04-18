import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { Switch } from 'antd';
import login from "../assets/images/login.png"
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import {  Input } from 'antd';
import { useState,useEffect } from "react";
const Login = () => {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (formData.email === '' || formData.password === '') {
    alert("All fields are required");
        return;
    }
    try {
        const response = await fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        console.log(data);
        localStorage.removeItem("token");
        if (data.status === 'success') {
            localStorage.setItem("token", data.jwt);
            localStorage.setItem("id", data.id);
            window.location.replace('/dashboard');

        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
    }
  
  };
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      window.location.replace('/dashboard');
    }
  })
  return (
    <section className="bg-[#F0F2F5]">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      <div className="lg:grid lg:grid-cols-2 min-h-screen" style={{ gridTemplateColumns: '60% 40%' }}>
        <div className="px-12 py-8">
          <nav className="lg:flex md:flex sm:flex w-full md:justify-between sm:justify-between lg:justify-between">
            <div className="flex items-center"><img src={logo} className="w-8 h-8"/><h1 className="font-semibold text-xl ml-2">EmoSense</h1></div>
            <div className="lg:inline md:inline sm:inline xl:inline hidden"><h1>Don't have account? <Link to="/signup" className="text-[#20DC49]">Sign up!</Link></h1></div>
          </nav>
          <section className="mt-[50px]">
            <h1 className="font-bold text-3xl text-center">Welcome Back</h1>
            <h3 className="mt-3 text-center">Login into your account</h3><br></br>
            <div className="flex text-center items-center justify-center">
              <div className="flex text-center items-center justify-center border border-gray-300 bg-[white] px-8 py-2 rounded-md hover:cursor-pointer"><FcGoogle className="text-3xl" /> &nbsp;Google </div>
              <div className="flex text-center items-center justify-center border border-gray-300 bg-[white] ml-4 px-8 py-2 rounded-md hover:cursor-pointer"><BsFacebook className="text-3xl text-[#3B5998]" /> &nbsp;Facebook </div>
            </div><br></br>
            <div className='flex items-center justify-center'>
              <hr className='w-[170px] bg-gray-300 h-[1px] border-none'></hr><h1 className='px-2 text-center text-black'>Or Continue With</h1><hr className='w-[170px] bg-gray-300 h-[1px] border-none'></hr>
            </div><br></br>
          </section>


          <form className="max-w-sm mx-auto">
            <div className="mb-5">
            <Input placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            id='email'
            className='email bg-white p-4 border border-gray-300 w-full rounded-md outline-none' />
            </div>
            <div className="mb-5">
            <Input.Password 
             id='password'
             value={formData.password}
             onChange={handleInputChange}
            placeholder="Password" className='password bg-white p-4 border border-gray-300 w-full rounded-md outline-none'/>
            </div>
            <div className="flex w-full justify-between mb-5">
              <div className="flex items-center">
                <Switch className="bg-[#4a4a4a]" onChange={onChange} /><p className="ml-2">Remember Me</p></div>
              <div>
                <Link to="/" className="text-[tomato]">Recover Password</Link></div>

            </div>
            <button type="button" onClick={handleForm} className="border border-[#20DC49] bg-[#20DC49] text-white rounded-md w-full px-8 py-2">Login</button>
          </form>
          <div className="lg:hidden sm:hidden md:hidden mt-4 xl:hidden "><h1>Don't have account? <Link to="/signup" className="text-[#20DC49]">Sign up!</Link></h1></div>

        </div>
        <div className="relative lg:inline md:hidden sm:hidden xl:inline hidden">
          <img src={login} alt="login" className="w-full min-h-screen max-h-screen object-cover " />
          <div className="flex items-center justify-center w-full rounded-lg">
            <div className="absolute bottom-12 p-4 grid items-center justify-center w-[80%] bg-white bg-opacity-10  backdrop-filter backdrop-blur-lg rounded-lg">
              <div className="bg-green-500 p-4 text-white rounded-lg">
                Unleash the power of emotions with EmoSense. Sign up to experience personalized emotion detection technology. Your feelings, your story — let EmoSense be your guide. Join us on this exciting journey today!
              </div>
            </div>
          </div>
        </div>


      </div>

    </section>
  );
}

export default Login;