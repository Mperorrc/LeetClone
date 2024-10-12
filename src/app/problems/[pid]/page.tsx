// app/problems/[pid]/page.tsx

import TopBar from '@/components/TopBar/page';
import Workspace from '@/components/WorkSpace/Workspace';
import { problems } from '@/utils/problems';
import React from 'react';
import { notFound } from 'next/navigation';

type ProblemPageProps = {
  params: { pid: string };
};

// This function generates the static paths
export async function generateStaticParams() {
  return Object.keys(problems).map((pid) => ({
    pid,
  }));
}

// This is your page component
const ProblemPage = async ({ params }: ProblemPageProps) => {  
  const problem = problems[params.pid];

  if (!problem) {
    notFound();
  }

  // Convert the handler function to a string if necessary
  const problemWithHandlerFunctionAsString = {
    ...problem,
    handlerFunction: problem.handlerFunction.toString(),
  };

  console.log(problemWithHandlerFunctionAsString); // Keep the console log for debugging

  return (
    <div>
      <TopBar problemPage={true} />
      <Workspace problem = {problemWithHandlerFunctionAsString}/>
    </div>
  );
};

export default ProblemPage;
