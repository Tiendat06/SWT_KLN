import {Skeleton} from "primereact/skeleton";
import {Column} from "primereact/column";

const KLNColumn = ({loading, body = null, ...props}) => {
    const bodyTemplate = () => {
        return loading ? <Skeleton animation="wave" width="100%"/> : body;
    };

    return <Column {...props} body={bodyTemplate}/>
}

export default KLNColumn;