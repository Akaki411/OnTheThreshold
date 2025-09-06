import React from 'react'
import Cross from "../parts/cross.jsx";
import Spinner from "../parts/spinner.jsx";
import CheckMark from "../parts/check-mark.jsx";

const LoadingStatus = ({
       loadingText = "Загрузка...",
       successText = "Успешно!",
       errorText = "Ошибка!",
       status // 'idle' | 'loading' | 'success' | 'error'
   }) =>
{

    if(status === "idle") return null

    return (
        <div className="loading-status">
            {status === 'loading' && (
                <>
                    <span>{loadingText}</span>
                    <Spinner/>
                </>
            )}
            {status === 'success' && (
                <>
                    <span>{successText}</span>
                    <CheckMark/>
                </>
            )}
            {status === 'error' && (
                <>
                    <span style={{color: "#AD0000"}}>{errorText}</span>
                    <Cross color="#AD0000"/>
                </>
            )}
        </div>
    )
}
export default LoadingStatus