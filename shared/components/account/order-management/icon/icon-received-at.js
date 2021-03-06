const IconReceivedAt = (props) => {
    return (
        <div className="d-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    fontSize: props.fontSize ?? 80,
                    color: props.color ?? '#707070',
                }}
                width="1em"
                height="1em"
                viewBox="0 0 84 84">
                <defs>
                    <filter
                        id="Ellipse_1793"
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
                    id="Group_9919"
                    data-name="Group 9919"
                    transform="translate(4.5 -1998.5)">
                    <g
                        transform="matrix(1, 0, 0, 1, -4.5, 1998.5)"
                        filter="url(#Ellipse_1793)">
                        <g
                            id="Ellipse_1793-2"
                            data-name="Ellipse 1793"
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
                        id="Group_10019"
                        data-name="Group 10019"
                        transform="translate(19.14 2019.06)">
                        <path
                            id="Path_20624"
                            data-name="Path 20624"
                            d="M-3137.441,2634.79v17.775a11.564,11.564,0,0,0-4.437-.879,11.6,11.6,0,0,0-11.6,11.6,11.545,11.545,0,0,0,1.1,4.926h-13.831a.789.789,0,0,1-.789-.79V2634.79a.789.789,0,0,1,.789-.79h27.979A.79.79,0,0,1-3137.441,2634.79Z"
                            transform="translate(3167 -2634)"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1"
                        />
                        <line
                            id="Line_977"
                            data-name="Line 977"
                            x2="18.604"
                            transform="translate(4.621 9.333)"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            strokeWidth="1"
                        />
                        <line
                            id="Line_978"
                            data-name="Line 978"
                            x2="18.604"
                            transform="translate(4.651 15.33)"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            strokeWidth="1"
                        />
                        <line
                            id="Line_979"
                            data-name="Line 979"
                            x2="8.078"
                            transform="translate(4.651 21.233)"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            strokeWidth="1"
                        />
                        <line
                            id="Line_980"
                            data-name="Line 980"
                            x1="5.691"
                            transform="translate(4.651 27.209)"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            strokeWidth="1"
                        />
                        <path
                            id="Path_20625"
                            data-name="Path 20625"
                            d="M-3095.922,2708.214a11.6,11.6,0,0,1-11.6,11.6,11.6,11.6,0,0,1-10.5-6.67,11.547,11.547,0,0,1-1.1-4.926,11.6,11.6,0,0,1,11.6-11.6,11.569,11.569,0,0,1,4.437.878A11.6,11.6,0,0,1-3095.922,2708.214Z"
                            transform="translate(3132.642 -2678.93)"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1"
                        />
                        <path
                            id="Path_20626"
                            data-name="Path 20626"
                            d="M-3097.883,2725.91l4.712,5.385,8.354-8.354"
                            transform="translate(3117.405 -2697.82)"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1"
                        />
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default IconReceivedAt;
