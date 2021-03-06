const IconPaymentAt = (props) => {
    return (
        <div className="d-center">
            <svg
                style={{
                    fontSize: props.fontSize ?? 80,
                    color: props.color ?? '#707070',
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 84 84">
                <defs>
                    <filter
                        id="Ellipse_1791"
                        x="0"
                        y="0"
                        width="84"
                        height="84"
                        filterUnits="userSpaceOnUse">
                        <feOffset dy="1" input="SourceAlpha" />
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feFlood floodOpacity="0.161" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                    </filter>
                </defs>
                <g
                    id="Group_9917"
                    data-name="Group 9917"
                    transform="translate(4.5 -1998.5)">
                    <g
                        transform="matrix(1, 0, 0, 1, -4.5, 1998.5)"
                        filter="url(#Ellipse_1791)">
                        <g
                            id="Ellipse_1791-2"
                            data-name="Ellipse 1791"
                            transform="translate(4.5 3.5)"
                            fill="#fff"
                            stroke="currentColor"
                            strokeWidth="1">
                            <circle
                                cx="37.5"
                                cy="37.5"
                                r="37.5"
                                stroke="none"
                            />
                            <circle cx="37.5" cy="37.5" r="37" fill="none" />
                        </g>
                    </g>
                    <g
                        id="Group_9911"
                        data-name="Group 9911"
                        transform="translate(12.18 2021.989)">
                        <g
                            id="Group_9909"
                            data-name="Group 9909"
                            transform="translate(0 9.366)">
                            <path
                                id="Path_20602"
                                data-name="Path 20602"
                                d="M-1426.044,2788.035v18.06h-5.509a.943.943,0,0,1-.942-.942v-16.176a.943.943,0,0,1,.942-.942Z"
                                transform="translate(1432.494 -2784.808)"
                                fill="none"
                                stroke="currentColor"
                                strokeMiterlimit="10"
                                strokeWidth="1"
                            />
                            <path
                                id="Path_20603"
                                data-name="Path 20603"
                                d="M-1384.312,2802.964c-.484,1.129-12.415,5-13.705,5.321s-15.641-4.354-16.609-4.354h-7.094v-18.06s4.675-3.063,6.45-3.225a5.962,5.962,0,0,1,1.98.665c3.271,1.486,9.533,5.105,13.306,7.382,1.751,1.058,2.967,1.822,3.1,1.951.484.484-.806,3.063-2.258,3.87s-8.868-4.353-10-1.613,9.191,8.547,10.642,8.708,12.093-3.386,12.9-3.547S-1383.828,2801.835-1384.312,2802.964Z"
                                transform="translate(1428.17 -2782.645)"
                                fill="none"
                                stroke="currentColor"
                                strokeMiterlimit="10"
                                strokeWidth="1"
                            />
                            <path
                                id="Path_20604"
                                data-name="Path 20604"
                                d="M-1424.01,2818.2h1.371"
                                transform="translate(1429.089 -2796.915)"
                                fill="none"
                                stroke="currentColor"
                                strokeMiterlimit="10"
                                strokeWidth="1"
                            />
                        </g>
                        <path
                            id="Path_20605"
                            data-name="Path 20605"
                            d="M-1372.842,2769.65v12.109a2.654,2.654,0,0,1-2.654,2.654h-18.746c-3.773-2.277-10.036-5.9-13.306-7.382v-7.381A2.651,2.651,0,0,1-1404.9,2767h29.4A2.653,2.653,0,0,1-1372.842,2769.65Z"
                            transform="translate(1422.483 -2767)"
                            fill="none"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeWidth="1"
                        />
                        <g
                            id="Group_9910"
                            data-name="Group 9910"
                            transform="translate(26.73 3.378)">
                            <circle
                                id="Ellipse_1794"
                                data-name="Ellipse 1794"
                                cx="5.558"
                                cy="5.558"
                                r="5.558"
                                transform="translate(0 0)"
                                fill="none"
                                stroke="currentColor"
                                strokeMiterlimit="10"
                                strokeWidth="1"
                            />
                            <text
                                id="_"
                                data-name="$"
                                transform="translate(3.407 7.719)"
                                fill="currentColor"
                                fontSize="7"
                                fontFamily="Roboto-Regular, Roboto">
                                <tspan x="0" y="0">
                                    $
                                </tspan>
                            </text>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    );
};
export default IconPaymentAt;
