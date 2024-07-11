import React from "react"


const Button = ({ children,
    type = "button", bgColor ="bg-blue-800", className="", ...props
}) =>{


    return(
        <button className={` p-2 ${bgColor} ${className} `} {...props}>
        {children}
        
        </button>
    )
}

export default Button