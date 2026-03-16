import { Card } from '../../components/ui/card';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export default function ProductGallery({ product }: any) {
  return (
    <Card className="border-0 overflow-hidden p-0">

      <div
        style={{ height: "420px" }}
        className="w-full overflow-hidden border border-gray-200 rounded-xl"
      >

        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover block"
        />

      </div>

    </Card>
  );
}
