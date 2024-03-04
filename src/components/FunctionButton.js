export const FunctionButton = ({ buttonFunction, text }) => {
  return (
  <button
    class="btn btn-dark btn-opacity-30 hover-opacity-40 text-white d-flex align-items-center justify-content-center w-100 p-4 m-2 border border-dark fs-5 rounded-circle"
    onClick={buttonFunction}
  >
    {text ? (text) : ("functionButton")}
  </button>
  
  )
};