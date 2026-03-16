import { Card, CardContent } from '../../components/ui/card';

export default function NutritionFacts({ nutrition }: any) {

  return (
    <div className="mt-12">

      <Card className="border-0 shadow-lg">

        <CardContent className="p-8">

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Nutrition Facts
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

            {Object.entries(nutrition).map(([key, value]) => (
              <div key={key} className="text-center">

                <div className="text-2xl font-bold text-green-600">
                  {value as string}
                </div>

                <div className="text-sm text-gray-600 capitalize">
                  {key}
                </div>

              </div>
            ))}

          </div>

        </CardContent>

      </Card>

    </div>
  );
}