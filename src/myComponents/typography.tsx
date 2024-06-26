import React from "react"

interface props{
    children: React.ReactNode,
    className?: string,
    customColor?: boolean
}

export default function Typography({children, className, customColor = false}: props){
    return(
        <p className={customColor ? `font-primary text-sm ${className}` : "text-txt font-primary text-sm " + className}>{children}</p>
    )
}