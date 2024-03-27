import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {fetchUserData} from "../api/authService";
export const Account=()=>{
    const [data,setData]=useState({});
    const history = useNavigate ();

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setData(response.data);
        }).catch((e)=>{
            localStorage.clear();
            history('/login');
        })
    },[])

    return (
        <main>
            <div className="container">
                <h2>User Account</h2>

                <div className="user-info">
                    <p><strong>Name:</strong> <span>{data.name} {data.surname}</span></p>
                    <p><strong>Email:</strong> <span>{data.email}</span></p>
                </div>

                <div className="actions">
                    <form action="/logout" method="post">
                        <button className="logoutButton" type="submit">Logout</button>
                    </form>

                    <Link className="editLink" to="/edit-user">Edit User</Link>
                </div>
            </div>
        </main>
    );
}