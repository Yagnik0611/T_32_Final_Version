import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter, Button,
  Typography
} from "@material-tailwind/react";

import { Component } from "react";

const INITIAL_VALUE = {
  username: "",
  password: "",
};
const loginErr = {
  msg: "",
  success: "",
};

export class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_VALUE,
      ...loginErr,
    };
  }
  onValueChanged = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      msg: "",
      success: "",
    });
  };
  onSubmitLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(this.state),
      });

      console.log(res);
      if (res.ok) {
        const data = await res.json();
        this.setState({ success: data.message });
        localStorage.setItem("token", "Bearer " + data.accessToken);
        localStorage.setItem("userId", this.state.username);
        setTimeout(() => {
          window.location.replace("../dashboard/settings");
        }, 1500);
      } else {
        localStorage.removeItem("token");
        const error = await res.json();
        this.setState({ msg: error.message });
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <>
        <img
          src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
        <div className="container mx-auto p-4">
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Sign In
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <h3>
                {" "}
                {this.state.success ? (
                  <div className="text-green-600">{this.state.success}</div>
                ) : null}
              </h3>

              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    value={this.state.email}
                    onChange={(event) => this.onValueChanged(event)}
                    name="username"
                    type="text"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="name@company.com"
                    required=""
                  />{" "}
                </div>
                <div>
                  <label
                    for="password"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    value={this.state.password}
                    onChange={(event) => this.onValueChanged(event)}
                    name="password"
                    type="password"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="•••••••"
                    required=""
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex h-5 items-center">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        class="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="remember"
                        class="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    class="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <span className="text-red-600"> {this.state.msg}</span>
              </form>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                type="submit"
                onClick={this.onSubmitLogin}
                variant="gradient"
                fullWidth
              >
                Sign In
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Don't have an account?
                <Link to="/auth/sign-up">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign up
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </Card>
        </div>
      </>
    );
  }
}
