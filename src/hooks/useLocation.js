import { useSearchParams } from "react-router-dom";
export function useLocation(){
    let [searcHParams] = useSearchParams();
    let lat = searcHParams.get("lat")
    let lng = searcHParams.get("lng")
    return [lat,lng]
}
