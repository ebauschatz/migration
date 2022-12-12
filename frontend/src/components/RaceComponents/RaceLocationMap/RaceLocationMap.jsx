import './RaceLocationMap.css'

const RaceLocationMap = (props) => {
    if (props.placeId !== "") {
        let mapSource = `https://www.google.com/maps/embed/v1/place?zoom=17&q=place_id:${props.placeId}&key=AIzaSyDQhT35nj-2_MIGFY05nIXucu4k8VTYuIs`;
        return (
            <div className="race-map">
                <iframe
                    title={props.placeId}
                    width="500"
                    height="350"
                    loading="lazy"
                    src={mapSource}
                ></iframe>
            </div>
            
        );
    }
    else {
        return <div>No Map Found</div>
    }
    
}
 
export default RaceLocationMap;