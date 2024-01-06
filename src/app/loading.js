export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        // <div className="flex items-center m-auto justify-center bg-orange-500">
        //     <h1>Loading</h1>
        // </div>
        <div class="relative m-auto flex justify-center items-center">
            <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-myOrange"></div>
            <img src="./favicon.ico" class="h-20 w-20"/>
        </div>
    );
}