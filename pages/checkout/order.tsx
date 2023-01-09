import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function OrderPage() {
  const router = useRouter();
  const params = router.query;
  const [param, getParam] = useState(params.order_id);
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    getParam(params.order_id);
  }, [params.order_id]);

  if (params.order_id === undefined) {
    return <h1>please Purchase an Item</h1>;
  }

  return (
    param &&
    user && (
      <div className="p-6">
        <h1 className="font-thin mb-10">Thank You: {user.name}</h1>
        <h1 className="font-thin mb-10">For The Donation.</h1>
        <h1 className="font-normal text-sm">Your ReceiptID: {param}</h1>
        <Link href="/" className="text-center underline">
          Home
        </Link>
      </div>
    )
  );
}

export const getServerSideProps = withPageAuthRequired();
