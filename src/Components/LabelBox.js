import React from "react";

function LabelBox({ arr, addClass, handleClick, handleChange, children }) {

    return(
        <form className={addClass ? addClass : ''}>
            {arr && arr.map((data, idx) => {
                const { name, id, type } = data
                return(
                    <label key={idx}>
                        <span>{name}</span>
                        <input name={name} onChange={handleChange} id={id} placeholder={name} type={type}/>
                    </label>
                )
            })}
            <button onClick={handleClick}>{children}</button>
        </form>
    )
}

export default LabelBox