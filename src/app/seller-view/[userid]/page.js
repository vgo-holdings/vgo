import CommonListing from "@/components/productShop";
import { productBySellerId } from "@/services/product";

export default async function ProductBySeller({ params }) {

    // const getAllProducts = await productBySellerId(params.userid);

    return <CommonListing param={params} />;
}