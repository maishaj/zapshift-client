import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((res) => {
        const formData = new FormData();
        formData.append("image", profileImg);

        //upload to imagebb using axios
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
        axios.post(image_API_URL, formData).then((res) => {
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateUserProfile(userProfile)
            .then((res) => {
              navigate(location?.state || "/");
            })
            .catch((error) => {});
        });
      })
      .catch((error) => {});
  };

  return (
    <div>
      <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
        <h3 className="text-3xl text-center font-bold">Welcome Back</h3>
        <p className="text-xxl text-center">Please Register</p>
        <form onSubmit={handleSubmit(handleRegistration)}>
          <div className="card-body">
            <fieldset className="fieldset">
              {/* Name */}
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input"
                placeholder="Your name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required!</p>
              )}

              {/* photo image */}
              <label className="label"></label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input"
                placeholder="Your photo"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Photo is required!</p>
              )}

              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required!</p>
              )}

              {/* password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                })}
                className="input"
                placeholder="Password"
              />

              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required!</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password length must be 6 characters or longer!!
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must have at least one uppercase, at least one
                  lowercase, at least one digit and at least one special
                  character!!
                </p>
              )}

              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
            <p>
              Already have an account in Zap Shift?{" "}
              <Link to="/login" className="underline text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
