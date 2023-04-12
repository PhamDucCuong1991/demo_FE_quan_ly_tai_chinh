import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import $ from 'jquery';

export default function Home() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate();
    let INDEX = 0;


    useEffect(() => {
        axios.get('http://localhost:8081/products/').then((response) => {
            setProducts(response.data)
            console.log(response.data)
        })
    }, [])


    return (
        <>
            <div className={'container'}>
                <h4 id={'logout'}>hello: {localStorage.getItem('username')} <a type={'button'} className={'btn btn-primary'}  onClick={logout}>Logout</a> </h4>
                <img src={localStorage.getItem('avatar')} style={{width: '10%'}}/>

                <h1>List Product</h1>

                <div className={'row'}>
                    <div className={'col-4'}>
                        <Link className={'btn btn-primary'} to={'/create-product'}>Create new Product</Link> &nbsp;
                        <select className={'btn btn-secondary'} id={'sortBy'} onChange={sortBy}>
                            <option value={1}>Sort by Price</option>
                            <option value={2}>Sort by title</option>
                        </select>
                    </div>

                    <div className={'col-4'}>
                        <input type="text" id={'search'} name={'name'}/> &nbsp;
                        <button className={'btn btn-primary'} type={'submit'} onClick={search}>Search</button>
                    </div>
                </div>
                <table className={'table table-striped'}>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>title</th>
                        <th>price</th>
                        <th>description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((item) => {
                        if (localStorage.getItem('token') !== "" && localStorage.getItem('token') !== null ) {
                            return (
                                <tr>
                                    <td>{++INDEX}</td>
                                    <td>{item.title}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>

                                    <td>
                                        <button onClick={() => deleteProduct(item.id)} className={'btn btn-danger'}>Xóa
                                        </button>
                                    </td>
                                    <td>
                                        <Link className={'btn btn-success'} to={`/update-product/${item.id}`}>Sửa</Link>
                                    </td>

                                </tr>
                            )
                        }
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )

    function deleteProduct(id) {
        if (window.confirm('are you sure??')) {
            axios.delete(`http://localhost:8081/products/${id}`).then(() => {
                axios.get('http://localhost:8081/products').then((response) => {
                    setProducts(response.data)
                })
            })
        }
    }

    function sortBy(name) {
        name = document.getElementById('sortBy').value;
        console.log(name)
        if (name === '1') {
            products.sort((a, b) => {
                return b.price - a.price
            })
            setProducts([...products])
        }
        if (name === '2') {
            products.sort((a, b) => {
                return a.title - b.title
            })
            setProducts([...products])
        }

    }

    function search(value) {
        value = document.getElementById('searchByBranch').value;
        console.log(value)
    }


    function logout() {
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('avatar')
        $("#logout").hide()
        $("#login").show()
        navigate('/home')

    }

}