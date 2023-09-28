import React, { useState } from "react";

import style from"./producer.module.css";

function Producer(producerFile) {
    console.log(producerFile);

    return (
        <div className={style.container}>
                <div className={style.producercontainer}>
                    <div className={style.el1}>
                        <h1>Producer</h1>
                             <p>
                                {producerFile.producerFile.header}
                            </p>
                            <br/>

                            <p>          
                                {producerFile.producerFile.biography}
                            </p>
                        </div>
                   
                    <div ClassName={style.el2}>
                        <img 
                            src={producerFile.producerFile.image}  
                            alt="producer pics"
                            className={style.img}
                        ></img>
                        
                        <h1 >
                            {producerFile.producerFile.name}
                        </h1>
                    </div>
                </div>
                </div>
            
       
    );
}
export default Producer;