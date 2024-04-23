import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {registerTherapist} from '../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../css/sb-admin-2.min.css';
import {Alert} from "reactstrap";
import {authenticate, authFailure, authSuccess} from "../../redux/authActions";
import SideBarAdmin from "./SideBars/SideBarAdmin";
import DashboardNav from "./DashboardNav";
function RegisterBootTherapist({loading,error,...props}){


    const [userData,setUserData]=useState({});
    const history = useNavigate ();
    const [values, setValues] = useState({
        email: '',
        name: '',
        surname: '',
        password: '',
        university: {},
        gender: {},
        location: {},
        language: {},
        experience: 0,
        number:''
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
                    history('/dashboard/adminDashboard/therapists');
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
                [name]: name === 'experience' ? Number(value) :
                    name === 'gender' ? { id: Number(value.split('-')[0]), gender: value.split('-')[1] } :
                        name === 'location' ? { id: Number(value.split('-')[0]), location: value.split('-')[1] } :
                            name === 'university' ? { id: Number(value.split('-')[0]), university: value.split('-')[1] } :
                                name === 'language' ? { id: Number(value.split('-')[0]), language: value.split('-')[1] } :
                                    value
            }));
        }
    };

   return (
       <main id="page-top">

           <div id="wrapper">

               <SideBarAdmin />

               <div id="content-wrapper" className="d-flex flex-column">

                   <div id="content">

                       <DashboardNav data={userData} setUser={props.setUser}/>

                       <div className="container-fluid">
                           <div className="bg-gradient-primary">
                                   <div className="card o-hidden border-0 shadow-lg my-5">
                                       <div className="card-body p-0">
                                           <div className="row">
                                               <div style={{display: 'flex', justifyContent: 'center'}}>
                                               <div className="col-lg-7">
                                                   <div className="p-5">
                                                       <div className="text-center">
                                                           <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                                       </div>
                                                       {error &&
                                                           <Alert style={{marginTop: '20px'}} variant="danger">
                                                               {error}
                                                           </Alert>
                                                       }
                                                       <form className="user" onSubmit={handleSubmit}>
                                                           <div className="form-group row">
                                                               <div className="col-sm-6 mb-3 mb-sm-0">
                                                                   <input type="text"
                                                                          className="form-control form-control-user"
                                                                          id="exampleFirstName" name="name"
                                                                          value={values.name}
                                                                          onChange={handleChange}
                                                                          placeholder="First Name" required/>
                                                               </div>
                                                               <div className="col-sm-6">
                                                                   <input type="text"
                                                                          className="form-control form-control-user"
                                                                          id="exampleLastName" name="surname"
                                                                          value={values.surname}
                                                                          onChange={handleChange}
                                                                          placeholder="Last Name" required/>
                                                               </div>
                                                           </div>
                                                           <div className="custom-dropdown">
                                                               <label htmlFor="universitySelect">University
                                                                   Attended</label>
                                                               <select
                                                                   id="universitySelect"
                                                                   name="university"
                                                                   value={values.university ? `${values.university.id}-${values.university.university}` : ''}
                                                                   onChange={handleChange}
                                                                   required
                                                               >
                                                                   <option defaultValue="">Select your university
                                                                   </option>
                                                                   <option value="1-AAB">AAB</option>
                                                                   <option value="2-UBT">UBT</option>
                                                                   <option value="3-KAKTUS">KAKTUS</option>
                                                                   <option
                                                                       value="4-UNIVERSITETI I PRISHTINES">UNIVERSITETI
                                                                       I
                                                                       PRISHTINES
                                                                   </option>
                                                               </select>
                                                           </div>

                                                           <div className="custom-dropdown">
                                                               <label htmlFor="locationSelect">Location</label>
                                                               <select
                                                                   id="locationSelect"
                                                                   name="location"
                                                                   value={values.location ? `${values.location.id}-${values.location.location}` : ''}
                                                                   onChange={handleChange}
                                                                   required
                                                               >
                                                                   <option defaultValue="">Select your location</option>
                                                                   <option value="1-Kosovo">Kosovo</option>
                                                                   <option value="2-Albania">Albania</option>
                                                                   <option value="3-Montenegro">Montenegro</option>
                                                                   <option value="4-North Macedonia">North Macedonia
                                                                   </option>
                                                                   <option value="5-Serbia">Serbia</option>
                                                               </select>
                                                           </div>

                                                           <div className="custom-dropdown">
                                                               <label htmlFor="languageSelect">Language</label>
                                                               <select
                                                                   id="languageSelect"
                                                                   name="language"
                                                                   value={values.language ? `${values.language.id}-${values.language.language}` : ''}
                                                                   onChange={handleChange}
                                                                   required
                                                               >
                                                                   <option defaultValue="">Select your language</option>
                                                                   <option value="1-Albanian">Albanian</option>
                                                                   <option value="2-English">English</option>
                                                                   <option value="3-Serbian">Serbian</option>
                                                               </select>
                                                           </div>


                                                           <div className="gender-segmented-control">
                                                               <button
                                                                   type="button"
                                                                   name="gender"
                                                                   className={`gender-option ${values.gender.gender === 'M' ? 'selected' : ''}`}
                                                                   onClick={() => handleChange({
                                                                       target: {
                                                                           name: 'gender',
                                                                           value: '1-M'
                                                                       }
                                                                   })}
                                                               >
                                                                   Male
                                                               </button>
                                                               <button
                                                                   type="button"
                                                                   name="gender"
                                                                   className={`gender-option ${values.gender.gender === 'F' ? 'selected' : ''}`}
                                                                   onClick={() => handleChange({
                                                                       target: {
                                                                           name: 'gender',
                                                                           value: '2-F'
                                                                       }
                                                                   })}
                                                               >
                                                                   Female
                                                               </button>
                                                               <button
                                                                   type="button"
                                                                   name="gender"
                                                                   className={`gender-option ${values.gender.gender === 'O' ? 'selected' : ''}`}
                                                                   onClick={() => handleChange({
                                                                       target: {
                                                                           name: 'gender',
                                                                           value: '3-O'
                                                                       }
                                                                   })}
                                                               >
                                                                   Other
                                                               </button>
                                                           </div>


                                                           <div className="form-group experience-input-group">
                                                               <input type="number"
                                                                      className="form-control form-control-user"
                                                                      id="exampleExperience" name="experience"
                                                                      value={values.experience}
                                                                      onChange={handleChange}
                                                                      placeholder="Work Experience" min="0" max="99"
                                                                      required/>
                                                               {/*{values.experience &&*/}
                                                               {/*    // <span className="years-label">years of work experience</span>}*/}
                                                           </div>

                                                           <div className="form-group">
                                                               <input type="email"
                                                                      className="form-control form-control-user"
                                                                      aria-describedby="emailHelp"
                                                                      id="exampleInputEmail" name="email"
                                                                      value={values.email}
                                                                      onChange={handleChange}
                                                                      placeholder="Email Address" required/>
                                                           </div>

                                                           <div className="form-group">
                                                               <input type="text"
                                                                      className="form-control form-control-user"
                                                                      aria-describedby="numberHelp"
                                                                      id="exampleInputNumber" name="number"
                                                                      value={values.number}
                                                                      onChange={handleChange}
                                                                      placeholder="Phone number" required/>
                                                           </div>

                                                           <div className="form-group row">
                                                               <div className="col-sm-6 mb-3 mb-sm-0">
                                                                   <input type="password"
                                                                          className="form-control form-control-user"
                                                                          id="exampleInputPassword"
                                                                          placeholder="Password"
                                                                          value={values.password}
                                                                          onChange={handleChange} name="password"
                                                                          required/>
                                                               </div>
                                                               <div className="col-sm-6">
                                                                   <input type="password"
                                                                          className="form-control form-control-user"
                                                                          id="exampleRepeatPassword"
                                                                          placeholder="Repeat Password"
                                                                          value={confirmPassword}
                                                                          onChange={handleChange} name="confirmPassword"
                                                                          required/>
                                                               </div>
                                                           </div>
                                                           <button type="submit"
                                                                   className="btn btn-primary btn-user btn-block">
                                                               Register
                                                           </button>
                                                       </form>
                                                       <hr/>
                                                       <div className="text-center">
                                                           <Link className="small" to="/forgotPassBoot">Forgot
                                                               Password?</Link>
                                                       </div>
                                                       <div className="text-center">
                                                           <Link className="small" to="/loginBoot">Already have an
                                                               account?
                                                               Login!</Link>
                                                       </div>
                                                   </div>
                                               </div>
                                           </div>
                                       </div></div>
                                   </div>
                               <script src="../../vendor/jquery/jquery.min.js"></script>
                               <script src="../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
                               <script src="../../vendor/jquery-easing/jquery.easing.min.js"></script>
                               <script src="../../js/sb-admin-2.min.js"></script>
                           </div>


                       </div>

                       <footer className="sticky-footer bg-white">
                           <div className="container my-auto">
                               <div className="copyright text-center my-auto">
                                   <span style={{color: 'grey'}}>Copyright &copy; PeacefulParts 2024</span>
                               </div>
                           </div>
                       </footer>

                   </div>

               </div>

               <a className="scroll-to-top rounded" href="#page-top">
                   <i className="fas fa-angle-up"></i>
               </a>

               <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                   <div className="modal-dialog" role="document">
                       <div className="modal-content">
                           <div className="modal-header">
                               <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                               <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                   <span aria-hidden="true">×</span>
                               </button>
                           </div>
                           <div className="modal-body">Select "Logout" below if you are ready to end your current
                               session.
                           </div>
                           <div className="modal-footer">
                               <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                               <Link className="btn btn-primary" to="/loginBoot">Logout</Link>
                           </div>
                       </div>
                   </div>
               </div>

           </div>
               <script src="../../vendor/jquery/jquery.min.js"></script>
               <script src="../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

               <script src="../../vendor/jquery-easing/jquery.easing.min.js"></script>

               <script src="../../js/sb-admin-2.min.js"></script>

               <script src="../../vendor/chart.js/Chart.min.js"></script>

               <script src="../../js/demo/chart-area-demo.js"></script>
               <script src="../../js/demo/chart-pie-demo.js"></script>

       </main>
   );
}

const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        authenticate: () => dispatch(authenticate()),
        setUser:(data)=> dispatch(authSuccess(data)),
        loginFailure:(message)=>dispatch(authFailure(message))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(RegisterBootTherapist);