import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee , coffees , setCoffees }) => {
  const { _id, photo, name, Price, quantity } = coffee;

  const handleDelete = (_id) => {
    console.log(_id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {

      console.log(result.isConfirmed);

      if (result.isConfirmed) 
        {
        fetch(`http://localhost:3000/coffees/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your coffee has been deleted.",
                icon: "success",
              });

              const remainingCoffees = coffees.filter(cof => cof._id !== _id);

              setCoffees(remainingCoffees);

            }
          })
      }
    });
  };

  return (
    <div className="card card-side bg-base-100 shadow-sm border-2">
      <figure>
        <img src={photo} alt="Movie" />
      </figure>
      <div className="flex justify-around w-full mt-5">
        <div className="text-start">
          <h2>{name}</h2>
          <p>Price : {Price}</p>
          <p>Quantity : {quantity}</p>
        </div>
        <div className="card-actions justify-end">
          <div className="join join-vertical space-y-2">
            <button className="btn join-item">View</button>
            <Link to={`/updateCoffee/${_id}`}>
                <button className="btn join-item">Edit</button>
            </Link>
            <button onClick={() => handleDelete(_id)} className="btn join-item">
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
