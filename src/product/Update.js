import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";

export default function Update() {
    const navigate = useNavigate();
    const param = useParams();
    const [product, setProduct] = useState({});


    useEffect(() => {
        axios.get(`http://localhost:8081/products/${param.id}`).then((response) => {
            setProduct(response.data)
            console.log(response.data)
        })
    }, [])

    const Validate = Yup.object().shape({
        title: Yup.string().required("Required!").min(2,"Too short!"),
        price: Yup.number().required("Required!").min(0,"Not Price!")
            .max(99999999, "So high!")
    })

    return(
        <>
            <div className={'container col-4'}>
                <h1>Update Product</h1>
                <Formik
                    initialValues={{
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        description: product.description
                    }}
                    onSubmit={(values) => {
                        save(values)
                    }}
                    validationSchema={Validate}
                    enableReinitialize={true}>
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

                        <button className={'btn btn-success'}>Submit</button> &ensp;
                        <Link className={'btn btn-danger'} to={'/home'}>Close</Link>
                    </Form>
                </Formik>
            </div>
        </>
    )

    function save(values) {
        console.log(values)
        axios.put(`http://localhost:8081/products/${param.id}`, values).then(() => {
            navigate('/home')
        })
    }
}