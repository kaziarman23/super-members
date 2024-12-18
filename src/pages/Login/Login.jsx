import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser } from "../../redux/features/userSlice";

const Login = () => {
  // state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // handle Submit
  const onSubmit = ({ email, password }) => {
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome, ${result.name}! Happy To See You Again.`,
          confirmButtonText: "OK",
          color: "white",
          background: "black",
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
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
              Please Login
            </h1>
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
              {errors.password?.type === "minLength" && (
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
                Did&#39;t have an account? Please{" "}
                <span className="text-blue-500 hover:underline">
                  <Link to="/register">Register</Link>
                </span>
              </p>
            </div>
            <div className="form-control">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
