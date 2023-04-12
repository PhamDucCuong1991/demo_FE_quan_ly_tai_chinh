import {Link, useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";

export default function Create() {
    const navigate = useNavigate();

    const Validate = Yup.object().shape({
        title: Yup.string().required("Required!").min(2, "Too short!"),
        price: Yup.number().required("Required!").min(0, "Not Price!")
            .max(99999999, "So high!")
    })

    if (localStorage.getItem('token') !== null) {
        return (
            <>
                <div className={'container col-4'}>
                    <h1>Create Employee</h1>
                    <Formik
                        initialValues={{
                            title: "",
                            price: "",
                            description: ""
                        }}
                        onSubmit={(values) => {
                            save(values)
                        }}
                        validationSchema={Validate}>
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Product Name</label>
                                <Field type="text" name={'title'} className="form-control" id="title"/>
                                <ErrorMessage name={'title'}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <Field type="text" name={'price'} className="form-control" id="price"/>
                                <ErrorMessage name={'price'}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <Field name={'description'} className="form-control" id="description"/>
                            </div>

                            <button className={'btn btn-success'}>Submit</button>
                            &ensp;
                            <Link className={'btn btn-danger'} to={'/home'}>Close</Link>
                        </Form>
                    </Formik>
                </div>
            </>
        )
    }

    function save(values) {
        console.log(values)
        axios.post('http://localhost:8081/products', values).then(() => {
            navigate('/home')
        })
    }

}