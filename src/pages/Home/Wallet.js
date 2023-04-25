import React, {useEffect, useState} from "react";
import axios from "axios";
import AWalletElement from "./AWalletElement";
import WalletDetailContent from "./WalletDetailContent";
import CreateWalletForm from "./createWalletForm";
import SimpleSlider from "./demo";

import WalletTransaction from "./WalletTransaction";
import arrow from "../../assets/img/448-arrow.png";

import ("../../assets/css/transaction.css")
import("./Wallet.css")
export default function Wallet(){
    let [nav1,setNav1]=useState(null);
    const [wallets,setWallets]=useState([])
    const [walletChoice,setWalletChoice]=useState(null)
    const [currentIndex,setCurrentIndex]=useState(0)
    const [isUpdate,setIsUpdate]=useState(true)
    const [click,setClick]=useState(false)
    const [showCreateForm,setShow]=useState(false)
    const idUser = localStorage.getItem("id");
    const [showUpdateForm,setUpdate]=useState(false)
    const [page,setPage]=useState(0)
    const [totalPages,setTotalPages]=useState(0)
    let index=page*5;
    useEffect(()=>{
        axios.get(`http://localhost:8080/user${idUser}/wallets/page${page}`).then((res)=> {
            setWallets(res.data.content)
            setTotalPages(res.data.totalPages)
            setIsUpdate(false)
        })
    },[page,isUpdate])
    useEffect(()=>{
        axios.get(`http://localhost:3000/wallets`).then((res)=> {
            setWalletChoice(res.data[0])
        })
    },[])
    function createPageArray(value){
        let array=[]
        if(totalPages>=5) {
            if (4 < value && value < totalPages - 3) {
                for (let i = 0; i < 5; i++) {
                    array.push(i + value - 2)
                }
                return array
            } else if (value <= 4) {
                array = [1, 2, 3, 4, 5]
                return array
            } else {
                array = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
                return array
            }
        } else{
            for (let i = 1; i <= totalPages; i++) {
                array.push(i)
            }
            return array
        }
    }
    function createPageDiv(arrays){
        return<div>
            {((page>=totalPages-3)||(4<page+1))&&(totalPages>6)&&<><button style={{border:"none",background:"#fff"}} id={"1"} onClick={(e)=>{setPage(+e.currentTarget.id-1)}}>1</button><p style={{display:"inline-block"}}>...</p></>}
            {arrays.map(arr=>{
                return <button style={arr!==page+1?{backgroundColor:"white",display:"inline-block",border:"none"}:{background:"#ff4568",display:"inline-block",border:"none",padding:"5px 10px",color:"#fff",borderRadius:"50px"}} id={""+arr} onClick={(e)=>{setPage(+e.currentTarget.id-1)}}>{arr}</button>
            })}
            {((totalPages-3>page+1)||(page+1<=4))&&(totalPages>6)&&<><p style={{display:"inline-block"}}>...</p>< button style={{border:"none",background:"#fff"}} id={""+totalPages} onClick={(e)=>{setPage(+e.currentTarget.id-1)}}>{totalPages}</button></>}
        </div>
    }
    return(<>
        <div className="content-account wallet-content-account" style={!showCreateForm?{filter: "blur(0px)"}:{filter: "blur(3px)"}}>

            <div className={"wallet-head"}>
                <div className={"wallet-head-between"}>
                    <div className={"wallet-head-content"}><h1>Quản lý ví tiền</h1></div>
                    <div className={"wallet-head-content"}>
                        <div
                            className="icon-border-wallet"
                            style={{cursor: "pointer"}}
                            onClick={()=>{setShow(true)}}
                        >
                            <i className="fa-solid fa-plus"/>
                            <span>Thêm ví mới</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"wallet-container"}>
            {/*     <h1>Wallet 's list</h1>*/}
            {/*     <table className={"wallet-list-table"}>*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <td>Index</td>*/}
            {/*        <td>Name</td>*/}
            {/*        <td>Total money</td>*/}
            {/*        <td>Limit money</td>*/}
            {/*        <td>Description</td>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {*/}
            {/*        wallets.map(wallet=>{*/}
            {/*    return(*/}
            {/*        <tr key={wallet.id} id={""+index} onClick={(e)=>{*/}
            {/*            nav1.slickGoTo(e.currentTarget.id-5*page );*/}
            {/*            setWalletChoice(wallets[+e.currentTarget.id])*/}
            {/*            setCurrentIndex(e.currentTarget.id-5*page)*/}
            {/*        }*/}
            {/*        }>*/}
            {/*            <td>{++index}</td>*/}
            {/*            <td>{wallet.name}</td>*/}
            {/*            <td>{wallet.totalMoney}</td>*/}
            {/*            <td>{wallet.limitMoney}</td>*/}
            {/*            <td></td>*/}
            {/*        </tr>*/}
            {/*    )*/}
            {/*    })}*/}
            {/*    </tbody>*/}
            {/*    <tfoot></tfoot>*/}
            {/*</table>*/}
            {/*    <div className={"pagination-btn-container"}>*/}
            {/*    <button onClick={()=>{setPage(page-1)}}> {"<"} </button>*/}
            {/*    {createPageDiv(createPageArray(page+1))}*/}
            {/*    <button onClick={()=>{setPage(page+1)}}>></button>*/}
            {/*    </div>*/}

            <div id='list-transaction'>
                <table id='table-list-transaction' style={{minWidth:"769px",fontSize:"15px"}}>
                    <thead>
                    <tr>
                        <th style={{paddingLeft: "50px"}} >Danh mục</th>
                        <th>Tên ví</th>
                        <th>Giới hạn chi tiêu</th>
                        <th>Số tiền</th>
                        <th>Mô tả</th>
                    </tr>
                    </thead>
                    <tbody>
                    {wallets.map((item)=>{

                        return(
                            <tr key={item.id} className={'active-row'} id={""+index++} onClick={(e)=>{
                                nav1.slickGoTo(e.currentTarget.id-5*page );
                                setWalletChoice(wallets[+e.currentTarget.id])
                                setCurrentIndex(e.currentTarget.id-5*page)
                            }
                            }>
                                <td className={'feature-field'} style={{paddingTop: 5, boxSizing: "border-box",paddingLeft: "10px"}}>
                                    <div style={{float: "left"}} className="icon-border-bus-dashboard" id={item.icon}>
                                        <i className={item.icon+' fa-light'}/>
                                    </div>
                                    <p style={{display:"inline-block",marginLeft:"10px",marginTop:"5px"}}>{item.name}</p>
                                </td>
                                <td className={'feature-field'} style={{color: "#8d8d8d"}}>{item.name}</td>
                                <td>{item.limitMoney}</td>
                                <td className={'feature-field'}>{item.totalMoney.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</td>
                                <td>Thẻ ngân hàng</td>
                            </tr>
                        )

                    })}

                    </tbody>
                </table>
            </div>
                <div id='pagination'>
                    <button className='btn-pre-next1' style={{cursor:page===0?"not-allowed":"pointer",fontSize:"15px"}}  onClick={page===0?null:()=>{setPage(page-1)}} ><img style={{width:"12px"}} src={arrow} alt=""/>Trước</button>
                    {createPageDiv(createPageArray(page+1))}
                    <button className='btn-pre-next2' style={{cursor:page===totalPages-1?"not-allowed":"pointer",fontSize:"15px"}} onClick={page===totalPages-1?null:()=>{setPage(page+1)}}>Sau <img style={{width:"12px"}} src={arrow} alt=""/></button>
                </div>
            </div>
                  <SimpleSlider wallets={wallets} nav1={nav1} setNav1={setNav1} setUpdate={setUpdate} setWalletChoice={setWalletChoice} setIsUpdate={setIsUpdate}></SimpleSlider>
            {/*<div className={"wallet-statistics"}></div>*/}
            {/*<div className={"wallet-chart"}>*/}
            {/*    <WalletDetailContent wallet={walletChoice} click={click} setClick={setClick} setWalletChoice={setWalletChoice} setIsUpdate={setIsUpdate}></WalletDetailContent>*/}
            {/*</div>*/}
           <WalletTransaction wallet={wallets[currentIndex]} setCurrentIndex={setCurrentIndex}></WalletTransaction>
        </div>
            {showCreateForm&&!showUpdateForm&&<CreateWalletForm setIsUpdate={setIsUpdate} setShow={setShow}></CreateWalletForm>}
            {!showCreateForm&&showUpdateForm&&<CreateWalletForm setIsUpdate={setIsUpdate} wallet={walletChoice} setWalletChoice={setWalletChoice} setUpdate={setUpdate}></CreateWalletForm>}

        </>
    )
}