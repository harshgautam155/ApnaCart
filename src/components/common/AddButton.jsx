import React from 'react'

function AddButton({onQtyChange, onRemove, item}) {
  return (
    <div className="inline-flex items-center justify-between w-24 h-11 border-[1.5px] border-gray-200 rounded-xl bg-white px-1 shadow-sm">
        <button
          className="flex items-center justify-center w-8 h-8 text-[22px] text-gray-600 rounded-lg transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200"
          onClick={() => {
            if (item.qty > 1) {
              onQtyChange(item.qty - 1);
            }
            if (item.qty === 1) {
              onRemove();
            }
          }}
          aria-label="Decrease"
        >
          &minus;
        </button>

        <span className="text-lg font-semibold text-gray-700 select-none font-sans">
          {item.qty}
        </span>

        <button
          className="flex items-center justify-center w-8 h-8 text-[22px] text-gray-600 rounded-lg transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200"
          onClick={() => {
            if (item.qty < item.countInStock) {
              onQtyChange(item.qty + 1);
            }
          }}
          disabled={item.qty >= item.countInStock}
          aria-label="Increase"
        >
          &#43;
        </button>
      </div>
  )
}

export default AddButton;