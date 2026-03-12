import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { CreditCard } from 'lucide-react';

export function PaymentForm({ formData, handleInputChange, nextStep, setStep }: any) {

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2" size={20} />
          Payment Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <div>
          <Label htmlFor="cardNumber">Card Number *</Label>
          <Input
            id="cardNumber"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiryDate">Expiry Date *</Label>
            <Input
              id="expiryDate"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              placeholder="MM/YY"
            />
          </div>

          <div>
            <Label htmlFor="cvv">CVV *</Label>
            <Input
              id="cvv"
              value={formData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value)}
              placeholder="123"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="cardName">Name on Card *</Label>
          <Input
            id="cardName"
            value={formData.cardName}
            onChange={(e) => handleInputChange('cardName', e.target.value)}
            placeholder="John Doe"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="saveInfo"
            checked={formData.saveInfo}
            onCheckedChange={(checked) =>
              handleInputChange('saveInfo', checked as boolean)
            }
          />
          <Label htmlFor="saveInfo">
            Save payment information for future orders
          </Label>
        </div>

        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={() => setStep(1)}
            className="flex-1"
          >
            Back
          </Button>

          <Button
            onClick={nextStep}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Review Order
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}