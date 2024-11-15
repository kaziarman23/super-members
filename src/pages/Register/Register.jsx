import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/features/userSlice";
import Swal from "sweetalert2";
import { useAddUsersMutation } from "../../redux/features/api/userApi";

const Register = () => {
  // states
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addUsers] = useAddUsersMutation();

  // form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // handle Submit
  const onSubmit = ({ name, email, password }) => {
    dispatch(createUser({ name, email, password }))
      .unwrap()
      .then((result) => {
        // sending data in the server
        const userInfo = { name, email };
        addUsers(userInfo);

        // showing success alert and navigating the user
        navigate("/");
        Swal.fire({
          icon: "success",
          title: "Register Successful",
          text: `Welcome, ${result.name}! Your account has been created.`,
          confirmButtonText: "OK",
          background: "black",
          color: "white",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Register Failed",
          text: error.message || "Something went wrong. Please try again.",
          confirmButtonText: "Retry",
          background: "black",
          color: "white",
        });
      });

    reset();
  };

  return (
    <div className="hero h-screen bg-black">
      <div className="hero-content w-full">
        <div className="card w-1/2  shrink-0 shadow-2xl border-2">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h1 className="text-2xl text-white font-bold text-center">
              Please Register
            </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">email is required</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", {
                  required: true,
                  minLength: 7,
                  maxLength: 20,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">password is required</p>
              )}
              {errors.password?.type === "requminLengthired" && (
                <p className="text-red-500">
                  password must be upper then 7 characters
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-500">
                  password password must be lower then 20 characters
                </p>
              )}
              <p className="my-5">
                Already have an account? Please{" "}
                <span className="text-blue-500 hover:underline">
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </div>
            <div className="form-control">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
