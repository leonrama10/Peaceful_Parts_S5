import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {registerTherapist} from '../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../css/sb-admin-2.min.css';
import {Alert} from "reactstrap";
import {authenticate, authFailure, authSuccess} from "../../redux/authActions";
function RegisterBootTherapist({loading,error,...props}){

    const history = useNavigate ();

const [values, setValues] = useState({
    email: '',
    name: '',
    surname: '',
    password: '',
    university: '',
    gender: '',
    experience: ''
});
  useEffect(() => {
      console.log("Current values state:", values);
    }, [values]); // This effect runs whenever `values` changes

    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        props.authenticate();
        if (values.password === confirmPassword) {
            registerTherapist(values).then((response) => {
                if (response.status === 201) {
                    props.setUser(response.data);
                    history('/loginBoot');
                } else {
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }


            }).catch((err) => {

                if (err && err.response) {

                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');

                    }

                } else {
                    console.log("ERROR: ", err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }

            });
        } else {
            props.loginFailure('Passwords do not match!!!');
        }
    }

    const handleChange = (e) => {
        e.persist();
        const { name, value } = e.target;


        console.log(`${name} changed:`, value);

        if (name === 'password') {
            setValues(values => ({
                ...values,
                [name]: value
            }));
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        } else {
            setValues(values => ({
                ...values,
                [name]: value
            }));
        }
    };
//const handleChangeGender = (e) => {
 //    console.log("Gender changed:",e.target.value);
//    const { name, value } = e.target;
//    setValues(prevState => ({
//        ...prevState,
//        [name]: value
//    }));
//};



   return (
           <main className="bg-gradient-primary">
               <div className="container">
                   <div className="card o-hidden border-0 shadow-lg my-5">
                       <div className="card-body p-0">
                           <div className="row">
                               <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                               <div className="col-lg-7">
                                   <div className="p-5">
                                       <div className="text-center">
                                           <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                       </div>
                                       {error &&
                                           <Alert style={{ marginTop: '20px' }} variant="danger">
                                               {error}
                                           </Alert>
                                       }
                                       <form className="user" onSubmit={handleSubmit}>
                                           <div className="form-group row">
                                               <div className="col-sm-6 mb-3 mb-sm-0">
                                                   <input type="text" className="form-control form-control-user"
                                                       id="exampleFirstName" name="name" value={values.name} onChange={handleChange}
                                                       placeholder="First Name" required />
                                               </div>
                                               <div className="col-sm-6">
                                                   <input type="text" className="form-control form-control-user"
                                                       id="exampleLastName" name="surname" value={values.surname} onChange={handleChange}
                                                       placeholder="Last Name" required />
                                               </div>
                                           </div>
                                           <div className="custom-dropdown">
                                               <label htmlFor="universitySelect">University Attended</label>
                                               <select
                                                   id="universitySelect"
                                                   name="university"
                                                   value={values.university}
                                                   onChange={handleChange}
                                                   required
                                               >
                                                   <option value="" disabled>Select your university</option>
                                                   <option value="AAB">AAB</option>
                                                   <option value="UBT">UBT</option>
                                                   <option value="KAKTUS">KAKTUS</option>
                                                   <option value="UNIVERSITETI I PRISHTINES">UNIVERSITETI I PRISHTINES</option>
                                                   {/* Add more options as needed */}
                                               </select>
                                           </div>

                                         <div className="gender-segmented-control">
                                             <button
                                                 type="button"
                                                 className={`gender-option ${values.gender === 'male' ? 'selected' : ''}`}
                                                 onClick={() => setValues({...values, gender: 'male'})}
                                             >
                                                 Male
                                             </button>
                                             <button
                                                 type="button"
                                                 className={`gender-option ${values.gender === 'female' ? 'selected' : ''}`}
                                                 onClick={() => setValues({...values, gender: 'female'})}
                                             >
                                                 Female
                                             </button>
                                             <button
                                                 type="button"
                                                 className={`gender-option ${values.gender === 'other' ? 'selected' : ''}`}
                                                 onClick={() => setValues({...values, gender: 'other'})}
                                             >
                                                 Other
                                             </button>
                                         </div>
                                        <div className="form-group experience-input-group">
                                            <input type="number" className="form-control form-control-user"
                                                id="exampleExperience" name="experience" value={values.experience} onChange={handleChange}
                                                placeholder="Work Experience" min="0" required />
                                            {values.experience && <span className="years-label">years of work experience</span>}
                                        </div>

                                           <div className="form-group">
                                               <input type="email" className="form-control form-control-user" aria-describedby="emailHelp"
                                                   id="exampleInputEmail" name="email" value={values.email} onChange={handleChange}
                                                   placeholder="Email Address" required />
                                           </div>
                                           <div className="form-group row">
                                               <div className="col-sm-6 mb-3 mb-sm-0">
                                                   <input type="password" className="form-control form-control-user"
                                                       id="exampleInputPassword" placeholder="Password" value={values.password}
                                                       onChange={handleChange} name="password" required />
                                               </div>
                                               <div className="col-sm-6">
                                                   <input type="password" className="form-control form-control-user"
                                                       id="exampleRepeatPassword" placeholder="Repeat Password"
                                                       value={confirmPassword}
                                                       onChange={handleChange} name="confirmPassword" required />
                                               </div>
                                           </div>
                                           <button type="submit" className="btn btn-primary btn-user btn-block">
                                               Register
                                           </button>
                                       </form>
                                       <hr />
                                       <div className="text-center">
                                           <Link className="small" to="/forgotPassBoot">Forgot Password?</Link>
                                       </div>
                                       <div className="text-center">
                                           <Link className="small" to="/loginBoot">Already have an account? Login!</Link>
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
    );
}
const mapStateToProps=({auth})=>{
    console.log("state ",auth)
    return {
        loading:auth.loading,
        error:auth.error
    }}
const mapDispatchToProps=(dispatch)=>{

    return {
        authenticate :()=> dispatch(authenticate()),
        setUser:(data)=> dispatch(authSuccess(data)),
        loginFailure:(message)=>dispatch(authFailure(message))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(RegisterBootTherapist);