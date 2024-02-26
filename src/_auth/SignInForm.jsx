const SignInForm = () => {
  return (
    <>
      <section className="max-w-[91.66%] w-full">
        <div className="py-4 flex flex-col items-center justify-center">
          <div className="mb-[32px] text-black text-xl font-bold ">
            Gara auto
          </div>
          <div className="bg-[white] w-full max-w-[400px] p-8 rounded-md">
            <span className="block w-full mt-3 mb-11 text-[#4096ff] text-[24px] font-bold  text-center">
              Sign in to your account
            </span>
            <div className="w-full flex flex-col">
              <label className="text-[14px] text-black pb-2" htmlFor="">
                Username
              </label>
              <input
                className="bg-white w-full px-[11px] py-[7px] rounded border border-[#d9d9d9] hover:border-[#1677ff] transition-all  outline-none focus:border-border-error-color "
                type="text"
                placeholder="Username"
              />
              <span className=" visible text-sm text-error-color">
                Invalid username
              </span>
            </div>
            <div className="w-full flex flex-col pb-1">
              <label className="text-[14px] text-black pb-2" htmlFor="">
                Password
              </label>
              <input
                className="bg-white w-full px-[11px] py-[7px] rounded border border-[#d9d9d9] hover:border-[#1677ff] transition-all  outline-none focus:border-border-error-color "
                type="password"
                placeholder="●●●●●●●"
              />
              <span className=" visible text-sm text-error-color">
                Invalid password
              </span>
            </div>
            <div className="w-full py-6">
              <button
                className="w-full px-[15px] py-[7px] bg-primary-color rounded-lg  text-base text-white hover:text-[#fff] hover:bg-primary-hover-color"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignInForm;
