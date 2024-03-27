import React, { useEffect, useState } from 'react';
import '../styles/Users.css';

export default function Users(){

    const [therapists, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('/peacefulPaths/getUsers')
            .then(response => response.json())
            .then(data => {
                setGroups(data);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <main>
                <div className="container">
                    <h3>Users Directory</h3>
                    <hr/>
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>Experience</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {therapists.map((tempEmployee) => (
                            <tr key={tempEmployee.id}>
                                <td>{tempEmployee.name}</td>
                                <td>{tempEmployee.surname}</td>
                                <td>{tempEmployee.email}</td>
                                <td>{tempEmployee.number}</td>
                                <td>{tempEmployee.experience}</td>
                                <td>
                                    {tempEmployee.roles.map((role, index, array) => (
                                        <React.Fragment key={role.id}>
                                            <span>{role.role}</span>
                                            {index < array.length - 1 && <span>, </span>}
                                        </React.Fragment>
                                    ))}
                                </td>

                                <td>
                                    <a href={`/peacefulPaths/showFormForUpdate/${tempEmployee.id}`}
                                       className="btn btn-info btn-sm">
                                        Update
                                    </a>
                                    <a href={`/peacefulPaths/delete/${tempEmployee.id}`}
                                       className="btn btn-danger btn-sm"
                                       onClick={() => {
                                           if (!window.confirm('Are you sure you want to delete this employee?')) return false
                                       }}>
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
