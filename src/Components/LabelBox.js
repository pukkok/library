import React from "react";

function LabelBox({ arr, addClass, handleClick, handleChange, children, options, optionChange }) {

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
            {options &&
                <select onChange={optionChange}>
                    {options.map((option, id)=> {
                        return <option key={id} value={option}>{option}</option>
                    })}
                </select>
            }
            <button onClick={handleClick}>{children}</button>
        </form>
    )
}

export default LabelBox