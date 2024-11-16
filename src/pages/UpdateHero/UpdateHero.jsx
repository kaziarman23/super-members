import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetMembersQuery,
  usePatchMembersMutation,
} from "../../redux/features/api/memberApi";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UpdateHero = () => {
  const navigate = useNavigate();
  const [hero, setHero] = useState();
  const { id } = useParams();
  const { data: allMembers } = useGetMembersQuery();
  const [patchMembers, { isLoading }] = usePatchMembersMutation();

  useEffect(() => {
    if (allMembers) {
      const selectedMember = allMembers.find((member) => member._id === id);
      setHero(selectedMember);
    }
  }, [allMembers, id]);

  // handle form submit
  const { register, handleSubmit, reset } = useForm();

  // handle loading
  if (isLoading) {
    return <p className="text-2xl text-center font-bold">Loading</p>;
  }

  // handle Submit
  const onSubmit = (data) => {
    const updatedData = {
      superhero: data.superhero || hero?.superhero,
      name: data.name || hero?.name,
      location: data.location || hero?.location,
    };
    patchMembers({ id, member: updatedData })
      .unwrap()
      .then((result) => {
        console.log(result);
        if (result.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Update successfull",
            text: `Super Hero Updated Successfully`,
            confirmButtonText: "OK",
            color: "white",
            background: "black",
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Update Faild",
            text: "Something went wrong. Please try again.",
            confirmButtonText: "OK",
            color: "white",
            background: "black",
          });
          navigate("/");
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Faild",
          text: error.message || "Something went wrong. Please try again.",
          confirmButtonText: "Retry",
          background: "black",
          color: "white",
        });
      });
    reset();
  };

  const handleCancel = () => {
    reset();
    navigate(-1);
  };

  return (
    <div className="hero h-screen bg-black">
      <div className="hero-content w-full">
        <div className="card w-1/2  shrink-0 shadow-2xl border-2">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h1 className="text-2xl text-white font-bold text-center">
              Update Member
            </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Super Hero</span>
              </label>
              <input
                type="text"
                placeholder="Super Hero Name"
                className="input input-bordered"
                {...register("superhero")}
                defaultValue={hero?.superhero}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Real Name"
                className="input input-bordered"
                {...register("name")}
                defaultValue={hero?.name}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                placeholder="Location"
                className="input input-bordered"
                {...register("location")}
                defaultValue={hero?.location}
              />
            </div>
            <div className="flex justify-center items-center gap-4 ">
              <button type="submit" className="btn btn-outline btn-success">
                Update
              </button>
              <button
                onClick={handleCancel}
                className="btn btn-outline btn-error"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateHero;
