import React from 'react'
import logo from "./icons/live-chat.png"


const Header = () => {

    // const myContext = 

    const handleButton=(e)=>{
        alert("You are now logout")
    }
    return (
        <>
            <div className='Header-container'>
                <div className='logo-container'>
                    <img src={logo} alt="logo" style={{ width: "15vh", margin: "20px" }} />
                </div>
                <div>
                    <h4 style={{'fontWeight': "bold", "fontFamily":"Segoe UI"}}>Welcome to MINDEASE AI DashBoard</h4>
                </div>
                <div className='btn-container'>
                    <button type="button" className="btn btn-danger" value="logout" onClick={handleButton}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}

export default Header