import React from 'react';
import expert1 from '../../../../src/images/experts/expert-1.jpg';
import expert2 from '../../../../src/images/experts/expert-2.jpg';
import expert3 from '../../../../src/images/experts/expert-3.jpg';
import expert4 from '../../../../src/images/experts/expert-4.jpg';
import expert5 from '../../../../src/images/experts/expert-5.jpg';
import expert6 from '../../../../src/images/experts/expert-6.png';
import Expert from '../Expert/Expert';
const experts=[
    {id:1,name:'will smith',img:expert1},
    {id:2,name:'kabul smith',img:expert2},
    {id:3,name:'messi ',img:expert3},
    {id:4,name:'mohashay',img:expert4},
    {id:5,name:'shyam singha roy',img:expert5},
    {id:6,name:'abul kashem',img:expert6}
];
const Experts = () => {
    return (
        <div id="experts" className='container mt-5  '>
                        <h2 className='text-primary text-center'>Our experts</h2>
                        <div className="row">
                            {
                                experts.map(expert=><Expert key={expert.id}
                                expert={expert}> </Expert>)
                            }
                        </div>
        </div>
    );
};

export default Experts;