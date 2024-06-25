import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../../../css/sb-admin-2.min.css';
import {loadState} from "../../../helper/sessionStorage";
import blueDog
    from "../../../img/pexels-mikegles-16622927-removebg-preview.jpg";

export default function VerifyPasswordInfo(){

    const history = useNavigate ();
    const passwordBoolean = loadState("ResetPassword",false)

    React.useEffect(()=>{
        if (!passwordBoolean){
            history('/loginBoot');
        }

    },[])

    return (
        <main className="bg-gradient-primary" style={{paddingTop:"58.4px"}}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: "10px",
                minHeight: "calc(100vh - 190px)",
                overflow: "auto"
            }}>
                <div className="card o-hidden border-0 shadow-lg my-5" style={{width: '100%', height: "500px"}}>
                    <div className="row" style={{width: '100%', height: "500px"}}>
                        <div className="col-lg-6 d-none d-lg-block"
                             style={{backgroundImage: `url(${blueDog})`, backgroundSize: 'cover'}}></div>
                        <div className="col-lg-6"
                             style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <div className="p-5">
                                <div className="text-center">
                                    <div className="container">
                                        <h3>Reset link sent</h3>
                                        {/*<p>Check your inbox at <span th:field="*{therapistShared.email}"*/}
                                        {/*                             th:text="${therapistShared.email}">${therapistShared.email}</span> on*/}
                                        {/*    how to reset your password</p>*/}
                                        <br/>
                                        <p>If you don't see the email in the next 10 minutes, check your
                                            junk or spam folder, then try resending it. If you continue to
                                            have issues accessing your account, please contact us.</p>
                                        <br/>
                                        <Link to="/loginBoot">Back to Login</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
