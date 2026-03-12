import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useApp } from '../../contexts/AppContext';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

import { CheckoutSteps } from './CheckoutSteps';
import { ShippingForm } from './ShippingForm';
import { PaymentForm } from './PaymentForm';
import { ReviewOrder } from './ReviewOrder';
import { CheckoutSummary } from './CheckoutSummary';

export function CheckoutPage() {

  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    address:'',
    city:'',
    state:'',
    zipCode:'',
    cardNumber:'',
    expiryDate:'',
    cvv:'',
    cardName:'',
    saveInfo:false,
    sameAddress:true,
    deliveryMethod:'standard'
  });

  const subtotal = state.cart.reduce(
    (total,item)=> total + (item.product.price * item.quantity),0
  );

  const tax = subtotal * 0.08;

  const shipping =
    formData.deliveryMethod === 'express'
      ? 12.99
      : subtotal > 50
      ? 0
      : 5.99;

  const total = subtotal + tax + shipping;

  const handleInputChange = (field:string,value:any)=>{
    setFormData(prev=>({...prev,[field]:value}));
  };

  const validateStep = (stepNumber:number)=>{

    if(stepNumber===1){
      return formData.firstName && formData.lastName && formData.email &&
      formData.address && formData.city && formData.state && formData.zipCode;
    }

    if(stepNumber===2){
      return formData.cardNumber && formData.expiryDate &&
      formData.cvv && formData.cardName;
    }

    return true;
  };

  const nextStep = ()=>{
    if(validateStep(step)){
      setStep(step+1);
    }else{
      toast.error('Please fill in all required fields');
    }
  };

  const placeOrder = ()=>{
    if(validateStep(2)){
      dispatch({type:'CLEAR_CART'});
      toast.success('Order placed successfully!');
      navigate('/');
    }else{
      toast.error('Please fill in all required fields');
    }
  };

  if(state.cart.length === 0){
    return <Navigate to="/cart" replace />;
  }

  return(

    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <Button
          variant="ghost"
          onClick={()=>navigate('/cart')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" size={16}/>
          Back to Cart
        </Button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Checkout
        </h1>

        <CheckoutSteps step={step}/>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">

            {step === 1 && (
              <ShippingForm
                formData={formData}
                handleInputChange={handleInputChange}
                nextStep={nextStep}
                subtotal={subtotal}
              />
            )}

            {step === 2 && (
              <PaymentForm
                formData={formData}
                handleInputChange={handleInputChange}
                nextStep={nextStep}
                setStep={setStep}
              />
            )}

            {step === 3 && (
              <ReviewOrder
                formData={formData}
                cart={state.cart}
                setStep={setStep}
                placeOrder={placeOrder}
              />
            )}

          </div>

          <CheckoutSummary
            subtotal={subtotal}
            tax={tax}
            shipping={shipping}
            total={total}
          />

        </div>

      </div>

    </div>

  );
}