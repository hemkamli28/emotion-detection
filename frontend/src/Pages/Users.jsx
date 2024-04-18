import React from 'react';
import {Table} from "antd";
import axios from "axios";
import { useEffect, useState } from 'react';
import AdminNavbar from '../Components/AdminNavbar';
import { Link } from 'react-router-dom';
const Users = () => {
const [emotionData, setEmotionData] = useState([]);  
      const columns = [
        {
            title: 'Index',
            dataIndex: 'emotion',
            key: 'name',
            render: (text, record, index) => index + 1
          },    
        {
          title: 'Name',
          dataIndex: 'username',
          key: 'username', 
          render: (text, record) => (
            <Link to={`/admin/user/${record.id}`}>{record.username}</Link>         
          )
        },      
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },      
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
        },      
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },      
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
        },      
        {
          title: 'Created At',
          dataIndex: 'created_at',
          key: 'created_at',
        //   render: (text, record) => (
        //     <p>{new Date(record.created_at).toLocaleString()}</p>
        //   )
        },      
      ];
      const fetchData = async () => {
        try {
          const id = localStorage.getItem("id");
          const response = await axios.get(`http://localhost:8000/api/user/all`);
          const data = await response
          console.log(data);
          setEmotionData(data?.data);
        } catch (err) {
          console.error(err);
        }
      }
      useEffect(() => { 
        fetchData();
      }, []);
      return (<>
      <AdminNavbar />
          <div className='p-12'>
            <h1 className='font-bold text-lg py-4'>All Users</h1>
            <div>
        <Table dataSource={emotionData} columns={columns} />
        </div>
      
    </div>
    </>
  );
}

export default Users;