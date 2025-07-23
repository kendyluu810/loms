export const fetchTrackingData = async () =>{
    const res = await fetch('/api/tracking');
    const data = await res.json();
    return data;
}