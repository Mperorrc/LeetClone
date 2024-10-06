import TopBar from '@/components/TopBar/page';
import React from 'react';

type ProblemPageProps = {
    
};

const ProblemPage:React.FC<ProblemPageProps> = () => {
    
    return( 
        <div>
            <TopBar problemPage={true} />
        </div>
    )
}
export default ProblemPage;