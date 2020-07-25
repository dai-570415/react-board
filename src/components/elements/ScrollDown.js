import React from 'react';

const ScrollDown = () => {
    return (
        <>  
            <div className="arrowWrap">
                <div className="arrowInner">
                    <p>Scroll Down</p>
                    <div className="arrow"></div>
                </div>
            </div>
            <style>{`
                .arrowInner p {
                    text-align: center;
                    font-size: 12px;
                    top: 75px;
                    position: relative;
                }
                .arrow {
                    width: 1px;
                    height: 100px;
                    margin: 100px auto 0;
                    background-color: #eee;
                    position: relative;
                    overflow: hidden;
                }
                .arrow::before {
                    content: '';
                    width: 1px;
                    height: 100px;
                    margin: 50px auto 0;
                    background-color: #000;
                    position: absolute;
                    top: -150px;
                    left: 0;
                    -webkit-animation: arrow 2.5s ease 0s infinite normal;
                    animation: arrow 2.5s ease 0s infinite normal;
                }
                @keyframes arrow {
                    0% {
                        -webkit-transform: translate3d(-50%, 0, 0);
                        transform: translate3d(-50%, 0, 0);
                    }

                    60% {
                        -webkit-transform: translate3d(-50%, 100px, 0);
                        transform: translate3d(-50%, 100px, 0);
                    }

                    100% {
                        -webkit-transform: translate3d(-50%, 100px, 0);
                        transform: translate3d(-50%, 100px, 0);
                    }
                }
            `}</style>
        </>
    );
}

export default ScrollDown;
