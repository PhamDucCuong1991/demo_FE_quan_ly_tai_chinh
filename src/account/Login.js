import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import axios, {AxiosError} from "axios";
import {useState} from "react";
import $ from 'jquery';

export function Login() {
    const navigate = useNavigate();
    const [account, setAccount] = useState({});

    const Validate = Yup.object().shape({
        email: Yup.string().required("Required!").min(2,"Too short!"),
        password: Yup.string().required("Required!").min(0, "Too short!")
                .max(10,"Too long!")
    })
    return(
        <>
            <div className={'container col-3'}>
                <h3>Form login</h3>
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
                            <label htmlFor="price" className="form-label">Password</label>
                            <Field type="password" name={'password'} className="form-control" id="password"/>
                            <ErrorMessage name={'password'}/>
                        </div>

                        <button className={'btn btn-success'}>Submit</button> &ensp;
                        <Link className={'btn btn-danger'} to={'/home'}>Close</Link>
                    </Form>
                </Formik>
            </div>
        </>

    )

    function save(values) {
        console.log(values)
        console.log(localStorage.getItem('token'))

        let account ={
            username: values.email,
            password: values.password
        }

        axios.post(`http://localhost:8080/user/login`, account).then((resp) => {

            if(resp.data === ""){
                window.alert("Account does not exist!")
                return;
            }
            console.log(resp)
            JSON.stringify(resp)
            localStorage.setItem('id', resp.data.id)
            localStorage.setItem('token', resp.data.token)
            localStorage.setItem('username', resp.data.username)
            localStorage.setItem('avatar',resp.data.avatar)
            $("#login").hide()
            navigate('/home')
        }).catch(err => window.alert("Wrong password!"));

    }


}