import {DataTable} from "primereact/datatable";
import {KLNSkeletonWithSpinner} from "~/components";
import EmptyDataIcon from "~/assets/icon/EmptyDataIcon";

const KLNDataTable = ({children, loading = false, ...props}) => {
    if (loading) {
        return (
            <div>
                {Array.from({length: 1}).map((_, i) => (
                    <KLNSkeletonWithSpinner key={`skeleton-table-${i}`} width="100%" height="500px" className="mb-1"
                                            animation="wave"/>
                ))}
            </div>
        );
    }

    return (
        <DataTable
            emptyMessage={
                (<div className="text-center">
                    <EmptyDataIcon />
                </div>)
            }
            {...props}
        >
            {children}
        </DataTable>
    )
}

export default KLNDataTable;