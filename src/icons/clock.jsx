export const Clock = ({ width, height, color }) => (
  <svg
    height={height}
    width={width}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8s8-3.6 8-8s-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6s6 2.7 6 6s-2.7 6-6 6z"
      fill={color}
    />
    <path d="M8 3H7v6h5V8H8z" fill={color} />
  </svg>
);

export default Clock;
