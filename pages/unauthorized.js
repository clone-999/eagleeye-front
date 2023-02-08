import { useRouter } from 'next/router';
import React from 'react';

export default function Unauthorized() {

  const router = useRouter();
  const { message } = router.query;

  return (
    <>
        <h1 className="text-xl">Access Denied</h1>
        {message && <div>{message}</div>}
    </>
  );
}
