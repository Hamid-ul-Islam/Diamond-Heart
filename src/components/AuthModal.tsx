import { FC, FormEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { doLogin, doRegister, updateModal } from "../redux/features/authSlice";
import { FaAddressBook, FaUser } from "react-icons/fa";
import { RiLockPasswordFill, RiUser3Fill } from "react-icons/ri";

import { RxCross1 } from "react-icons/rx";
import { MdEmail } from "react-icons/md";
import { PiPhone } from "react-icons/pi";
import axios from "axios";

const AuthModal: FC = () => {
  const [clicked, setClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.authReducer.modalOpen);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = await axios.post("https://dhserver.vercel.app/login", {
      email,
      password,
    });
    if (user.data) {
      dispatch(doLogin({ email, password }));
    }
  };

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = await axios.post("https://dhserver.vercel.app/register", {
      email,
      password,
      name,
      address,
      phone,
    });

    if (user.data) {
      dispatch(doRegister({ email, password, name, address, phone }));
    }
  };

  if (open) {
    return (
      <div className="bg-[#0000007d] w-full min-h-screen fixed inset-0 z-30 flex items-center justify-center font-karla px-4">
        <div
          className="relative border shadow rounded p-8 bg-white max-w-md w-full z-40"
          data-test="login-container"
        >
          <RxCross1
            className="absolute cursor-pointer right-5 top-5 hover:opacity-85"
            onClick={() => dispatch(updateModal(false))}
          />
          {clicked ? (
            <>
              <div className="flex mb-2 space-x-2 justify-center items-center">
                <h3 className="font-bold text-center text-2xl">Register</h3>
              </div>
              <form onSubmit={register} className="flex flex-col space-y-3">
                <div className="relative">
                  <input
                    data-test="input-name"
                    type="text"
                    placeholder="Your full name"
                    className="border w-full border-black py-2 px-8 rounded"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                  <FaUser className="absolute top-3 left-2 text-lg" />
                </div>
                <div className="relative">
                  <input
                    data-test="input-email"
                    type="text"
                    placeholder="Your email here"
                    className="border w-full border-black py-2 px-8 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MdEmail className="absolute top-3 left-2 text-lg" />
                </div>
                <div className="relative">
                  <input
                    data-test=""
                    type="text"
                    placeholder="Your phone"
                    className="border w-full border-black py-2 px-8 rounded"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                  />
                  <PiPhone className="absolute top-3 left-2 text-lg" />
                </div>
                <div className="relative">
                  <input
                    data-test=""
                    type="text"
                    placeholder="Your address"
                    className="border w-full border-black py-2 px-8 rounded"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                  />
                  <FaAddressBook className="absolute top-3 left-2 text-lg" />
                </div>
                <div className="relative">
                  <input
                    data-test="input-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Your password here"
                    className="border w-full border-black py-2 px-8 rounded"
                  />
                  <RiLockPasswordFill className="absolute top-3 left-2 text-lg" />
                </div>
                <input
                  data-test="input-submit"
                  type="submit"
                  value="Register"
                  className="bg-indigo-500 text-white rounded p-2 hover:bg-indigo-700 cursor-pointer"
                />
              </form>
              <p className="text-center mt-1">
                Already have an account?{" "}
                <span
                  className="text-indigo-500 cursor-pointer"
                  onClick={() => setClicked(false)}
                >
                  Login
                </span>
              </p>
            </>
          ) : (
            <>
              <div className="flex mb-2 space-x-2 justify-center items-center">
                <h3 className="font-bold text-center text-2xl">Login</h3>
              </div>
              <form onSubmit={submitForm} className="flex flex-col space-y-3">
                <div className="relative">
                  <input
                    data-test="input-email"
                    type="text"
                    placeholder="Your email here"
                    className="border w-full border-black py-2 px-8 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <RiUser3Fill className="absolute top-3 left-2 text-lg" />
                </div>
                <div className="relative">
                  <input
                    data-test="input-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Your password here"
                    className="border w-full border-black py-2 px-8 rounded"
                  />
                  <RiLockPasswordFill className="absolute top-3 left-2 text-lg" />
                </div>
                <input
                  data-test="input-submit"
                  type="submit"
                  value="Login"
                  className="bg-indigo-500 text-white rounded p-2 hover:bg-indigo-700 cursor-pointer"
                />
              </form>
              <p className="text-center mt-1">
                No Account?{" "}
                <span
                  className="text-indigo-500 cursor-pointer"
                  onClick={() => setClicked(true)}
                >
                  Register
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }
};

export default AuthModal;
