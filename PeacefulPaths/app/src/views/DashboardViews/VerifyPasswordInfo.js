import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../../css/sb-admin-2.min.css';
import {loadState} from "../../helper/sessionStorage";

export default function VerifyPasswordInfo(){

    const history = useNavigate ();
    const passwordBoolean = loadState("ResetPassword",false)

    React.useEffect(()=>{
        if (!passwordBoolean){
            history('/loginBoot');
        }
    },[])

    return (
        <main className="bg-gradient-primary">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">

                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                    <div className="col-lg-6">
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

                    </div>

                </div>

            </div>

            <script src="../../vendor/jquery/jquery.min.js"></script>
            <script src="../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="../../vendor/jquery-easing/jquery.easing.min.js"></script>
            <script src="../../js/sb-admin-2.min.js"></script>

        </main>
    )
}
