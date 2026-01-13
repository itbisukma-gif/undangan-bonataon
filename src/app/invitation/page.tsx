import { Suspense } from 'react';
import Invitation from './invitation';

export default function InvitationPageContainer() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Invitation />
    </Suspense>
  );
}
