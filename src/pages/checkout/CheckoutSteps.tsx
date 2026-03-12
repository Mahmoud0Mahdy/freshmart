interface Props {
  step: number;
}

export function CheckoutSteps({ step }: Props) {
  return (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((stepNumber) => (
        <div key={stepNumber} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= stepNumber
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {stepNumber}
          </div>

          {stepNumber < 3 && (
            <div
              className={`w-12 h-1 mx-2 ${
                step > stepNumber ? 'bg-green-600' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}