import Calendar from "./Calendar";
import Clickup from "./Clickup";
import DateTime from "./DateTime";
import Weather from "./Weather";

export default function HomePage() {
    return (
        <div>
            <h3 className="text" style={{ marginTop: '-1vh' }}>Welcome to Rutgers Formula Racing!</h3>
            <Weather />
            <DateTime />
            <Calendar />
            <Clickup />
        </div>
    );
}