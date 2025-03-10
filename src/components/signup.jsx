import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // برای تولید توکن منحصر به فرد

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // اعتبارسنجی: بررسی مطابقت رمز عبور
    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    // بررسی وجود کاربر قبلی
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === email)) {
      alert("This email is already registered. Please log in.");
      return;
    }

    // تولید توکن منحصر به فرد
    const token = uuidv4();

    // ذخیره اطلاعات کاربر و توکن در localStorage
    const newUser = { email, password, token };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // ذخیره وضعیت لاگین
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify({ email, token }));

    console.log("Stored User:", JSON.parse(localStorage.getItem("users")));

    // هدایت به صفحه اصلی
    navigate("/");
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen items-center justify-center bg-gray-900 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-3xl mt-10 text-center font-bold tracking-tight text-white">
          Hyper<span className="text-rose-500">Movie</span>
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignup} className="space-y-6">
          {/* فیلد ایمیل */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-500 sm:text-sm"
              />
            </div>
          </div>

          {/* فیلد رمز عبور */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-500 sm:text-sm"
              />
            </div>
          </div>

          {/* فیلد تکرار رمز عبور */}
          <div>
            <label
              htmlFor="repeatPassword"
              className="block text-sm font-medium text-white"
            >
              Repeat Password
            </label>
            <div className="mt-2">
              <input
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                autoComplete="new-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-500 sm:text-sm"
              />
            </div>
          </div>

          {/* دکمه ثبت‌نام */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-rose-500 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
            >
              Sign up
            </button>
          </div>
        </form>

        {/* لینک ورود */}
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-rose-500 hover:text-rose-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
