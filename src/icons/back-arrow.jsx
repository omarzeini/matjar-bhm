const BackArrow = ({width, height, color, strokWidth}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-chevron-left preview-icon"
   
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);
export default BackArrow;
