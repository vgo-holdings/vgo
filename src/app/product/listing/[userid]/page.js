import CommonListing from "@/components/CommonListing";
import { productBySellerId } from "@/services/product";

export default async function ProductBySeller({ params }) {

    const getAllProducts = await productBySellerId(params.userid);

    return <CommonListing data={getAllProducts && getAllProducts.data} />;
}