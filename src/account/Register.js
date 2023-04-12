import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {useState} from "react";
import storage from "./FireConfig";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import * as Yup from "yup";
import $ from 'jquery';

export function Register() {
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [progressPercent, setProgressPercent] = useState(0);
    const [check, setCheck] = useState(false);

    const Validate = Yup.object().shape({
        email: Yup.string().matches(/[a-z0-9]+@[a-z0-9]+/ ,"Email invalidate!").required("Required!").min(2, "Too short!"),
        password: Yup.string().required("Required!").min(0, "Too short!")
            .max(10, "Too long!")
    })

    return (
        <>
            <div className={'container col-5'}>
                <h1>Register</h1>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    onSubmit={(values) => {
                        save(values)
                    }}
                    validationSchema={Validate}>
                    <Form>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <Field type="email" name={'email'} className="form-control" id="email"/>
                            <ErrorMessage name={'email'}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <Field type="password" name={'password'} className="form-control" id="password"/>
                            <ErrorMessage name={'password'}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="rePassword" className="form-label">Password</label>
                            <Field type="password" name={'rePassword'} className="form-control" id="rePassword"/>
                            <ErrorMessage name={'password'}/>
                        </div>
                        <input id={'idRole'} value={1} hidden/>

                        {/*<div className="mb-3">*/}
                        {/*    <label htmlFor="image" className="form-label">Image</label>*/}
                        {/*    <input type="file" className="form-control" id="image"*/}
                        {/*           onChange={(e) => uploadFile(e)}/>*/}
                        {/*</div>*/}
                        {/*{*/}
                        {/*    !image &&*/}
                        {/*    <div className='outer-bar'>*/}
                        {/*        <div className='inner-bar'*/}
                        {/*             style={{width: `${progressPercent}%`}}>Loading...{progressPercent}%*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    image &&*/}
                        {/*    <img className={'updateImg'} src={image} alt='uploaded file'/>*/}
                        {/*}*/}

                        <button className={'btn btn-success'}>Submit</button>
                        &ensp;
                        <Link className={'btn btn-danger'} to={'/home'}>Close</Link>
                    </Form>
                </Formik>
            </div>
        </>
    )


    function save(values) {

        let pw = $("#password").val();
        let pw1 = $("#rePassword").val();
        if(pw !== pw1){
            window.alert("Password does not match!")
            return
        }

        if (image !== undefined) {
            values.image = image
        }
        let account ={
            username : values.email,
            password: values.password,
            role:{
                id: $("#idRole").val()
            }
        }

        console.log(account)

        axios.post('http://localhost:8080/user/register', account).then(() => {
            window.alert("Register success!")
            navigate('/home')
        }).catch(err =>
            window.alert("Fail")
        )

    }

    function uploadFile(e) {
        setCheck(true)
        if (e.target.files[0]) {
            const time = new Date().getTime()
            const storageRef = ref(storage, `image/${time}_${e.target.files[0].name}`);
            const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress =
                        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgressPercent(progress);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImage(downloadURL)
                        setCheck(false)
                    });
                }
            );
        }
    }
}