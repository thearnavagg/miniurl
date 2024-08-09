import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/component/ui/tabs";
import Signin from "@/component/Signin";
import Signup from "@/component/Signup";

const Auth = () => {
  const [searchParams] = useSearchParams();
  return (
    <div className="flex min-h-screen justify-center items-center lg:items-start bg-muted px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-5">
        {searchParams.get("createNew") ? (
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
              Whoops! It looks like you haven't unlocked this door yet.
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Please enter credentials to continue your journey!
            </p>
          </div>
        ) : (
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
              Welcome back
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Or{" "}
              <Link
                to="#"
                className="font-medium text-primary hover:text-primary/90"
                prefetch={false}
              >
                sign up for a new account
              </Link>
            </p>
          </div>
        )}
        <Tabs defaultValue="signin" className="space-y-8">
          <TabsList className="flex justify-center">
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Signin />
          </TabsContent>
          <TabsContent value="signup">
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
