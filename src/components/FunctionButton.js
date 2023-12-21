import React from 'react';

export const FunctionButton = ({ buttonFunction, text }) => {
  return (
    <button
      class="flex-1 rounded-full bg-black bg-opacity-30 hover:bg-opacity-40 text-white flex items-center justify-center w-full p-4 m-2 border border-black text-lg"
      onClick={buttonFunction}>
      {text ? (text) : (<>functionButton</>)}
    </button>
  )
};