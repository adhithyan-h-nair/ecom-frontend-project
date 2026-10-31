const Login = ({
  formData,
  loginData,
  handleInput,
  handleLoginInput,
  handleChange = handleInput || handleLoginInput,
  handleSubmit,
  handleLoginSubmit = handleSubmit,
}) => {
  const data = formData || loginData || {};

  return (
    <div>
      <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3 p-2">
        <div className="flex flex-col w-full">
          <label htmlFor="email">Email</label>
          <input
            className=" border rounded-md p-2 bg-white"
            type="email"
            placeholder="janedoe@email.com"
            name="email"
            id="email"
            value={data.email || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="password">Password</label>
          <input
            className=" border rounded-md p-2 bg-white"
            type="password"
            placeholder="password"
            name="password"
            id="password"
            value={data.password || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-medium py-2 rounded-md cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
