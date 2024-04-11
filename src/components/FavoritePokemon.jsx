import React from "react";
import LikePokemon from "./LikePokemon";

function FavoritePokemon({ favorite }) {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      
      {favorite?.map((data, index) => (
        <div key={index}>
          <h3>{data.name}</h3>
          <img
            src={data?.sprites?.other?.home?.front_default}
            alt={data?.name}
          />
          <LikePokemon/>
        </div>
      ))}
    </div>
  );
}

export default FavoritePokemon;
