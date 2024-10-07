import TopBar from '@/components/TopBar/page';
import Workspace from '@/components/WorkSpace/Workspace';
import React from 'react';

type ProblemPageProps = {
    
};

const ProblemPage:React.FC<ProblemPageProps> = () => {
    
    return( 
        <div>
            <TopBar problemPage={true}/>
            <Workspace/>
        </div>
    )
}
export default ProblemPage;