const Register = () => {
  return (
    <div>
      <form action="" className="flex flex-col gap-3 p-2">
        <div className="flex flex-col w-full">
          <label htmlFor="fullname">Full Name</label>
          <input
            className="border rounded-md p-2 bg-white"
            type="text"
            placeholder="Jane Doe"
            name="fullname"
            id="fullname"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="email">Email</label>
          <input
            className="border rounded-md p-2 bg-white"
            type="email"
            placeholder="janedoe@email.com"
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="password">Password</label>
          <input
            className="border rounded-md p-2 bg-white"
            type="password"
            placeholder="password"
            name="password"
            id="password"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="password">Confirm Passowrd</label>
          <input
            className="border rounded-md p-2 bg-white"
            type="password"
            placeholder="password"
            name="password"
            id="password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-950 text-white font-medium py-2 rounded-md cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
