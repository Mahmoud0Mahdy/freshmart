import { Separator } from '../../../components/ui/separator';

export function InstructionsList({ instructions }: { instructions: string[] }) {
  return (
    <>
      <Separator className="my-6" />
      <h2 className="text-xl font-bold mb-4">Instructions</h2>
      <div className="space-y-4">
        {instructions.map((instruction, index) => (
          <div key={index} className="flex">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 shrink-0">
              {index + 1}
            </div>
            <p className="text-gray-700 mt-1">{instruction}</p>
          </div>
        ))}
      </div>
    </>
  );
}