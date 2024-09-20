'use client';

import { useGit } from '@/context/Git';

export default function Dashboard () {
  const usGit = useGit()

  return (
    <div>
      Here's the dashboard
    </div>
  )
}
