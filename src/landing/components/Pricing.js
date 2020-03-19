import React from 'react';
import PricingCard from './PricingCard';

const Pricing = () => {

    const planStyle = {
        fontSize: '3em',
        padding:5,
    }

    return (
        <div style={{ width: '100%', textAlign: 'center'}}>
            <p style={planStyle}><b>Choose a plan that is right for you</b></p>
            <div style={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent:'center', flexWrap:'wrap', height:'100%'}}>
                <PricingCard title="Starter" desc="This is a Starter plan" price="Free" />
                <PricingCard title="Standard" desc="This is a Basic plan" price="$9" />
                <PricingCard title="Pro" desc="This is a Pro plan" price="$29" />
            </div>
        </div>
    );
}

export default Pricing;