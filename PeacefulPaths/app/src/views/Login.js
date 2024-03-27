// import React, { useState } from 'react';
// import '../styles/Login.css';
// import { connect } from 'react-redux';
// import { authenticate, authFailure, authSuccess } from '../redux/authActions';
// import {userLogin} from '../api/authService';
// import {Alert} from 'react-bootstrap';
// import { useNavigate  } from 'react-router-dom';
// const Login=({loading,error,...props})=>{
//     // const history = useNavigate ();
//     //
//     // const [values, setValues] = useState({
//     //     email: '',
//     //     password: ''
//     // });
//     //
//     // const handleSubmit=(evt)=>{
//     //     evt.preventDefault();
//     //     props.authenticate();
//     //
//     //     userLogin(values).then((response)=>{
//     //         if(response.status===200){
//     //             props.setUser(response.data);
//     //             history('/account');
//     //         }
//     //         else{
//     //             props.loginFailure('Something LEKAAAAAAA!Please Try Again');
//     //         }
//     //
//     //
//     //     }).catch((err)=>{
//     //
//     //         if(err && err.response){
//     //
//     //             switch(err.response.status){
//     //                 case 401:
//     //                     console.log("401 status");
//     //                     props.loginFailure("Authentication Failed.Bad Credentials");
//     //                     break;
//     //                 default:
//     //                     props.loginFailure('Something BABAAAAAA!Please Try Again');
//     //
//     //             }
//     //
//     //         }
//     //         else{
//     //             console.log("ERROR: ",err)
//     //             props.loginFailure('Something NaNAAAAA!Please Try Again');
//     //         }
//     //
//     //     });
//     // }
//     //
//     // const handleChange = (e) => {
//     //     e.persist();
//     //     setValues(values => ({
//     //         ...values,
//     //         [e.target.name]: e.target.value
//     //     }));
//     // };
//
//     return (
//         <div className="App">
//             <div className="container">
//                 <h3>Login Directory</h3>
//                 <hr/>
//                 { error &&
//                     <Alert style={{marginTop:'20px'}} variant="danger">
//                         {error}
//                     </Alert>
//                 }
//                 <form onSubmit={handleSubmit}>
//                     <div style={{gap: "10px", display: "flex"}}>
//                         <input type="email" value={values.email} name="email" onChange={handleChange}
//                                className="form-control mb-4 w-25" placeholder="Email" id="email" required/>
//                     </div>
//                     <div style={{gap: "10px", display: "flex", position: "relative"}}>
//                         <input type="password" value={values.password} onChange={handleChange} name="password"
//                                id="password" className="form-control mb-4 w-25" placeholder="Password" autoComplete="new-password" required/>
//                     </div>
//                     <a href="/peacefulPaths/forgotPassword">Forgot Password?</a>
//                     <br/>
//                     <button type="submit" className="btn btn-info col-2">Login</button>
//                 </form>
//                 <hr/>
//             </div>
//         </div>
//     )}
//     // const mapStateToProps=({auth})=>{
//     //     console.log("state ",auth)
//     //     return {
//     //         loading:auth.loading,
//     //         error:auth.error
//     //     }}
//     // const mapDispatchToProps=(dispatch)=>{
//     //
//     //     return {
//     //         authenticate :()=> dispatch(authenticate()),
//     //         setUser:(data)=> dispatch(authSuccess(data)),
//     //         loginFailure:(message)=>dispatch(authFailure(message))
//     //     }
//     // }
// export default connect(mapStateToProps,mapDispatchToProps)(Login);
