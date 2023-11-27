import CommonDetails from "@/components/CommonDetails";
import { productById } from "@/services/product";

export default async function ProductDetails({ params }) {
  const productDetailsData = await productById(params.details);
 

  return (
    <div style={{height:'100%',width:'100%'}}>
      <CommonDetails item={productDetailsData && productDetailsData.data}  />
    </div>
  );
}
