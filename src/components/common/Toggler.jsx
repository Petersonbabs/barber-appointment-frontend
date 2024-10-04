import React, { useEffect, useState } from "react";

const Toggler = ({ register, rounded }) => {
  return (
    <div className="toggler flex gap-2 items-center">
      <label htmlFor="toggler" className={rounded ? `rounded-[${rounded}]` : 'rounded-[30px]'}>
        <input
          type="checkbox"
          name="toggler"
          id="toggler"
          {...register("saveAccount")}
        />
        <span id="slider"></span>
      </label>
    </div>
  );
};

export default Toggler;
