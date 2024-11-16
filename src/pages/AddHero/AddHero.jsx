import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAddMembersMutation } from "../../redux/features/api/memberApi";

const AddHero = () => {
  const navigate = useNavigate();
  const [addMembers, { isLoading }] = useAddMembersMutation();

  // form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (isLoading) {
    return <p className="text-2xl text-center font-bold">Loading</p>;
  }

  // handle Submit
  const onSubmit = (data) => {
    addMembers(data)
      .unwrap()
      .then((result) => {
        console.log(result);
        if (result.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Super Hero Added Successful",
            text: `Welcome, ${data.name}! You'r Now One of Us.`,
            confirmButtonText: "OK",
            color: "white",
            background: "black",
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Super Hero is Already a Member",
            text: `${data.name} is our old member.`,
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
          title: "Invalied",
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
              Add Member
            </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Super Hero</span>
              </label>
              <input
                type="text"
                placeholder="Super Hero Name"
                className="input input-bordered"
                {...register("superhero", { required: true })}
              />
              {errors.superhero?.type === "required" && (
                <p className="text-red-500">superhero name is required</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Real Name"
                className="input input-bordered"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Real Name is Required</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                placeholder="Location"
                className="input input-bordered"
                {...register("location", {
                  required: true,
                })}
              />
              {errors.location?.type === "required" && (
                <p className="text-red-500">Location is Required</p>
              )}
            </div>
            <div className="flex justify-center items-center gap-4 ">
              <button type="submit" className="btn btn-outline btn-success">
                Add
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

export default AddHero;
