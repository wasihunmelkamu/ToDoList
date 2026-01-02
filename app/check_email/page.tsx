import Link from "next/link";
import { MailOpen, ArrowRight, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
      <Card className="w-full max-w-md  border-slate-200 overflow-hidden">
        <div className="h-2 bg-green-600 w-full"></div>
        <CardHeader className="pt-10 pb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <MailOpen className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Check your email
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            We've sent a temporary verification link to your inbox.
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-slate-100 p-4 text-sm text-slate-700">
            <p>
              {" "}
              please click the link in the email to{" "}
              <strong> activate your account</strong>
              The link will expire in 24 hours
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <a
                href="https://mail.google.com"
                target="_blank "
             rel=" noopener noreferrer"
              >
                <Inbox className="mr-2 h-4 w-4" />
                Open Mailbox
              </a>
            </Button>
            <Button variant="ghost" asChild className="w-full text-slate-500">
              <Link href="/Login">
                Back to Login <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="px-1" >
          <p className="text-xs text-center text-slate-500 px-6">
            Didn't receive the email? Check your spam folder or
          </p>
          <Link
            href="/signup"
            className="text-green-600 font-medium hover:underline ml-1"
          >
            
           try signup up again
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
