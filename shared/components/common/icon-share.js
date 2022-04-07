const IconShare = (props) => {
    const {widthLine="1"}=props;
    return (
        <div className="d-center">
            <svg
                fontSize={props.fontSize ?? 20}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 18.535 16.45">
                <path
                    id="Path_18150"
                    d="M18.4,8.536,14.634,4.672V9.436C3.5,10.425,4.7,19.793,4.7,19.793a11.289,11.289,0,0,1,9.93-4.909v5.238L18.4,16.26,22.175,12.4Z"
                    transform="translate(-4.14 -4.172)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={widthLine}
                />
            </svg>
        </div>
    );
};
export default IconShare;
