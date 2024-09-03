import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signup } from "@/db/apiAuth";
import { Button } from "@/component/ui/button";
import { Card, CardContent } from "@/component/ui/card";
import { Input } from "@/component/ui/input";
import { Label } from "@/component/ui/label";
import Error from "./error";
import { PacmanLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { UrlState } from "@/context/UrlContext";

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const generateRandomCredentials = () => {
    const randomString = Math.random().toString(36).substring(2, 8);
    const email = `guest_${randomString}@example.com`;
    const password = randomString + Math.random().toString(36).substring(2, 4);
    const name = randomString;
    return { name, email, password };
  };
  const handleGuestSignup = async () => {
    const { name, email, password } = generateRandomCredentials();
    setFormData({ name, email, password });
  };
  const { loading, error, fn: fnSignup, data } = useFetch(signup, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      setErrors({});
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [error, data]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });
      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (validationError) {
      const newErrors = {};
      validationError.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        {error && <Error message={error.message} />}
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <Button
              onClick={handleGuestSignup}
              type="submit"
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground my-3"
            >
              {loading ? "Generating..." : "Continue as Guest"}
            </Button>
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="mt-1 block w-full"
              placeholder="Arnav Aggarwal"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <Error message={errors.name} />}
          </div>
          <div>
            <Label htmlFor="email">
              Email address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div>
            <Label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 block w-full"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <Error message={errors.password} />}
          </div>
          <div>
            <Label htmlFor="profile-photo">
              Profile Photo <span className="text-gray-500">(optional)</span>
            </Label>
            <Input
              id="profile-photo"
              name="profile_pic"
              type="file"
              accept="image/*"
              className="mt-1 block w-full"
              onChange={handleInputChange}
            />
          </div>
          <Button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full"
          >
            {loading ? (
              <PacmanLoader color="#ffffff" size={12} loading />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;
