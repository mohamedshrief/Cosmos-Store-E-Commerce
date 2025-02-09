import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { DNA } from "react-loader-spinner";

export default function Register() {
  function showSuccessAlert() {
    swal({
      title: "Success!",
      text: "Congratulations",
      icon: "success",
      button: "OK",
    });
  }
  function showErrorAlert(message) {
    swal({
      title: "Error!",
      text: message,
      icon: "error",
      button: "OK",
    });
  }
  const [errorMgs, seterrorMgs] = useState(null);
  const [isSuccess, setisSuccess] = useState(false);
  const [isclicked, setisclicked] = useState(false);
  let navigate = useNavigate();
  const inputsinItialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const signUp = useFormik({
    initialValues: inputsinItialValues,
    onSubmit: function (values) {
      setisclicked(true);
      axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
        .then(function () {
          setisSuccess(true);
          showSuccessAlert();
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        })
        .catch(function (error) {
          seterrorMgs(error.response.data.message);
          showErrorAlert(errorMgs);
        });
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Name is required")
        .min(3, "Minmum length is 3")
        .max(20, "Maximum length is 20")
        .matches(
          /^(?=.{3,20}$)[a-zA-Z0-9_\u0600-\u06FF]+$/,
          "Name must be (3-20) in length and can't include and special characters except (_)"
        ),
      email: yup
        .string()
        .required("Email is required")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Email should matches this form (example@example.com)"
        ),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Minmum length is 8")
        .max(20, "Maximum length is 20")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
          "Password must include at least [ capital letter - small letter - number - one of these (!@#$%^&*) ]"
        ),
      rePassword: yup
        .string()
        .required("Repassword is required")
        .oneOf([yup.ref("password")]),
      phone: yup
        .string()
        .required("phone is required")
        .matches(/^01[0-9]{9}$/, "phone must matches ex: 01012345678 "),
    }),
    validateOnChange: true,
  });
  return (
    <div id="register" className="py-20">
      <form className="max-w-md mx-auto" onSubmit={signUp.handleSubmit}>
        <div className="relative z-0 w-full my-8 group">
          <input
            type="text"
            name="name"
            id="name"
            value={signUp.values.name}
            onChange={signUp.handleChange}
            onBlur={signUp.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-stone-400 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Your Name
          </label>
        </div>

        {signUp.errors.name && signUp.touched.name ? (
          <div
            className="shadow-md shadow-red-600 flex items-center px-4 py-2 mb-4 text-sm text-white rounded-lg bg-red-500 dark:bg-gray-800 dark:text-white"
            role="alert"
          >
            <svg
              className="shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Danger alert!</span>{" "}
              {signUp.errors.name}
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="relative z-0 w-full my-8 group">
          <input
            type="email"
            name="email"
            id="email"
            value={signUp.values.email}
            onChange={signUp.handleChange}
            onBlur={signUp.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-stone-400 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        {signUp.errors.email && signUp.touched.email ? (
          <div
            className="shadow-md shadow-red-600 flex items-center px-4 py-2 mb-4 text-sm text-white rounded-lg bg-red-500 dark:bg-gray-800 dark:text-white"
            role="alert"
          >
            <svg
              className="shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Danger !</span>{" "}
              {signUp.errors.email}
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="relative z-0 w-full my-8 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            value={signUp.values.phone}
            onChange={signUp.handleChange}
            onBlur={signUp.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-stone-400 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone number (123-456-7890)
          </label>
        </div>
        {signUp.errors.phone && signUp.touched.phone ? (
          <div
            className="shadow-md shadow-red-600 flex items-center px-4 py-2 mb-4 text-sm text-white rounded-lg bg-red-500 dark:bg-gray-800 dark:text-white"
            role="alert"
          >
            <svg
              className="shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Danger !</span>{" "}
              {signUp.errors.phone}
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            value={signUp.values.password}
            onChange={signUp.handleChange}
            onBlur={signUp.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-stone-400 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {signUp.errors.password && signUp.touched.password ? (
          <div
            className="shadow-md shadow-red-600 flex items-center px-4 py-2 mb-4 text-sm text-white rounded-lg bg-red-500 dark:bg-gray-800 dark:text-white"
            role="alert"
          >
            <svg
              className="shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Danger !</span>{" "}
              {signUp.errors.password}
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            value={signUp.values.rePassword}
            onChange={signUp.handleChange}
            onBlur={signUp.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-stone-400 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-400 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
        </div>

        {signUp.errors.rePassword && signUp.touched.rePassword ? (
          <div
            className="shadow-md shadow-red-600 flex items-center px-4 py-2 mb-4 text-sm text-white rounded-lg bg-red-500 dark:bg-gray-800 dark:text-white"
            role="alert"
          >
            <svg
              className="shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Danger !</span>{" "}
              {signUp.errors.rePassword}
            </div>
          </div>
        ) : (
          ""
        )}

        <button
          type="submit"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-emerald-300 text-black hover:text-white text-md font-bold dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            {isclicked ? (
              <DNA
                visible={true}
                height="40"
                width="40"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            ) : (
              "submit"
            )}
          </span>
        </button>
      </form>
    </div>
  );
}

// let muser = {
// email:mo.97.2025@gmail.com,
// email:mo.97.2026@gmail.com,
// pass: AAaa@1234
// tkn : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YThkODRlZmE3ODk1ZTgxZjNhYTJhMiIsIm5hbWUiOiJtb2hhbWVkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzkxMTg2NzAsImV4cCI6MTc0Njg5NDY3MH0.lufmHllE9mjpjxKZr58vgriqCqRZI2IQxy1zOFkc1cI"
// }
