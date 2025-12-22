import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center 
       justify-center bg-gray-100 gap-y-3">
      <h1 className="text-3xl font-bold">Welcome to TasFlow app</h1>
      <p>
        Secure task managemnt with<span className="text-red-400"> Auth.js</span>{" "}
      </p>
      <Link href="/Login">
        <Button variant="outline" className="hover:bg-gray-100">
          Get Started
        </Button>
      </Link>
    </div>
  );
}
