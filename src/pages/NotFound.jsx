import { Link } from "react-router";

export default function NotFound() {
    return (
        <div className="container-md text-center p-4">
            <h1>Ops...</h1>
            <h2 className="my-3">Page not found</h2>
            <Link to={'/'}>Go to Home</Link>
        </div>
    );
}