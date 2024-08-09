import { Button } from "@/component/ui/button";
import { Card, CardContent } from "@/component/ui/card";
import { Input } from "@/component/ui/input";
import { Label } from "@/component/ui/label";
import { PacmanLoader } from "react-spinners";

const Signup = () => {
  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              required
              className="mt-1 block w-full"
              placeholder="Arnav Aggarwal"
            />
          </div>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 block w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            {true ? (
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
