const Plus = ({height, width, color}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={height}
    height={width}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-plus preview-icon"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);
export default Plus;
