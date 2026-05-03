import { useState, useEffect } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useApp } from '../../contexts/AppContext';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

import { CheckoutSteps } from './components/CheckoutSteps';
import { ShippingForm } from './components/ShippingForm';
import { PaymentForm } from './components/PaymentForm';
import { ReviewOrder } from './components/ReviewOrder';
import { CheckoutSummary } from './components/CheckoutSummary';

import { getUserProfile } from '../../api/userProfileApi'; // 🔥 مهم

export function CheckoutPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useApp();
  const [step, setStep] = useState(1);

  const quickProduct = location.state?.quickProduct;
  const quickQuantity = location.state?.quickQuantity;

  const cartItems = quickProduct
    ? [{ product: quickProduct, quantity: quickQuantity }]
    : state.cart;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    saveInfo: false,
    sameAddress: true,
    deliveryMethod: 'standard'
  });

  // 🔥 Prefill من Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();

        setFormData(prev => ({
          ...prev,
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          zipCode: data.zipCode || '',
        }));

      } catch {
        console.log("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const subtotal = cartItems.reduce(
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

  // 🔥 مهم: نخزن في Context
  const handleInputChange = (field:string,value:any)=>{
    setFormData(prev=>{
      const updated = {...prev,[field]:value};

      dispatch({
        type:'SET_CHECKOUT_DATA',
        data: updated
      });

      return updated;
    });
  };

  const validateStep = (stepNumber:number)=>{

    if(stepNumber===1){
      return formData.fullName && formData.email &&
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

      console.log("ORDER DATA:", state.checkoutData); 

      if(!quickProduct){
        dispatch({type:'CLEAR_CART'});
      }

      toast.success('Order placed successfully!');
      navigate('/');
    }else{
      toast.error('Please fill in all required fields');
    }
  };

  if(!quickProduct && state.cart.length === 0){
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
                cart={cartItems}
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